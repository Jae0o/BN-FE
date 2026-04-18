import { useCallback, useEffect, useRef, useState } from "react";

import { useAuthStore } from "@entities/auth";
import noteKeys from "@lib/apis/queries/note/keys";
import type { NoteStreamPhase } from "@lib/types";
import { useQueryClient } from "@tanstack/react-query";

import type { UseNoteStreamParams, UseNoteStreamReturn } from "./useNoteStream.type";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const handleStreamEvent = (
  event: NoteStreamPhase,
  noteNumber: number,
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  switch (event) {
    case "summary_ready":
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteNumber) });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists });
      break;

    case "actions_ready":
      queryClient.invalidateQueries({ queryKey: noteKeys.actions(noteNumber) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteNumber) });
      break;

    case "entities_ready":
      queryClient.invalidateQueries({ queryKey: noteKeys.related(noteNumber) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteNumber) });
      break;

    case "completed":
    case "failed":
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      break;
  }
};

const parseSSELine = (line: string): NoteStreamPhase | null => {
  if (line.startsWith("event:")) {
    return line.slice(6).trim() as NoteStreamPhase;
  }

  return null;
};

const connectStream = async (
  noteNumber: number,
  signal: AbortSignal,
  onPhase: (phase: NoteStreamPhase) => void,
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) return;

  onPhase("pending");

  try {
    const response = await fetch(`${BASE_URL}/api/v1/notes/${noteNumber}/stream`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal,
    });

    if (!response.ok || !response.body) {
      onPhase("failed");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const event = parseSSELine(line);

        if (event) {
          onPhase(event);
          handleStreamEvent(event, noteNumber, queryClient);
        }
      }
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;

    onPhase("failed");
  }
};

const useNoteStream = ({
  noteNumber,
  enabled = false,
}: UseNoteStreamParams): UseNoteStreamReturn => {
  const [phase, setPhase] = useState<NoteStreamPhase>("idle");

  const abortRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();

  const unsubscribe = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const subscribe = useCallback(() => {
    unsubscribe();

    if (noteNumber <= 0) return;

    const controller = new AbortController();
    abortRef.current = controller;

    connectStream(noteNumber, controller.signal, setPhase, queryClient);
  }, [noteNumber, queryClient, unsubscribe]);

  useEffect(() => {
    if (!enabled || noteNumber <= 0) return unsubscribe;

    subscribe();

    return unsubscribe;
  }, [enabled, noteNumber, subscribe, unsubscribe]);

  return { phase, subscribe, unsubscribe };
};

export default useNoteStream;
