import type { NoteStreamPhase, ProcessingStatus } from "@lib/types";

export interface NoteInfoPanelProcessingProps {
  noteNumber: number;
  processingStatus: ProcessingStatus;
  streamPhase: NoteStreamPhase;
  summary: string | undefined;
}
