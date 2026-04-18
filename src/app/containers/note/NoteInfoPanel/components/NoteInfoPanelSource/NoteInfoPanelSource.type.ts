import type { ActionItem, NoteDetail } from "@lib/types";

export interface NoteInfoPanelSourceProps {
  noteDetail: NoteDetail | undefined;
  actions: ActionItem[];
}
