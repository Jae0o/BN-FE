import type { ActionItem } from "@lib/types";

export interface UseNoteActionsParams {
  noteNumber: number;
}

export type UseNoteActionsResponse = ActionItem[];
