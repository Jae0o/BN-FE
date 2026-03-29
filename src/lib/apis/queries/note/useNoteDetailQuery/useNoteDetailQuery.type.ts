import type { NoteDetail } from "@lib/types";

export interface UseNoteDetailParams {
  noteNumber: number;
}

export type UseNoteDetailResponse = NoteDetail;
