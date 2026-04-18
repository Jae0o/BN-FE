import type { NoteDetail } from "@lib/types";

export interface NoteContentProps {
  noteNumber: number;
  noteDetail: NoteDetail | undefined;
  onSaveSuccess: () => void;
}
