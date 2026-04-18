import type { NoteDetail, NoteStreamPhase } from "@lib/types";

export interface NoteInfoPanelProps {
  noteNumber: number;
  noteDetail: NoteDetail | undefined;
  streamPhase: NoteStreamPhase;
}
