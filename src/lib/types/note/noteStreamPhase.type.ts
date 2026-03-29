export type NoteStreamPhase =
  | "idle"
  | "pending"
  | "processing"
  | "summary_ready"
  | "actions_ready"
  | "entities_ready"
  | "completed"
  | "failed";
