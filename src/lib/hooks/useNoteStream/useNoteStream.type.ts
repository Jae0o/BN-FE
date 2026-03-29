import type { NoteStreamPhase } from "@lib/types";

export interface UseNoteStreamParams {
  noteNumber: number;
  enabled?: boolean;
}

export interface UseNoteStreamReturn {
  phase: NoteStreamPhase;
  subscribe: () => void;
  unsubscribe: () => void;
}
