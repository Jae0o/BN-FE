import type { NoteDetail } from "@lib/types";

export interface NoteInfoPanelProps {
  noteNumber: number;
  noteDetail: NoteDetail | undefined;
}
