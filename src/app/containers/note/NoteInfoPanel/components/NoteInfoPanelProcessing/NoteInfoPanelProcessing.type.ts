import type { ProcessingStatus } from "@lib/types";

export interface NoteInfoPanelProcessingProps {
  noteNumber: number;
  processingStatus: ProcessingStatus;
  summary: string | undefined;
}
