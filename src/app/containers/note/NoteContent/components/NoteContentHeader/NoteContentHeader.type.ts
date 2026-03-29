import type { ProcessingStatus } from "@lib/types";

import type { SaveStatus } from "../../hooks/useNoteEditor/useNoteEditor.type";

export interface NoteContentHeaderProps {
  noteNumber: number;
  saveStatus: SaveStatus;
  processingStatus: ProcessingStatus;
  tags: string[];
}
