import type { RelatedNoteItem } from "@lib/types";

export interface UseRelatedNotesParams {
  noteNumber: number;
  limit?: number;
  depth?: number;
}

export interface UseRelatedNotesResponse {
  items: RelatedNoteItem[];
}
