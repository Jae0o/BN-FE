import { useNoteActionsQuery, useRelatedNotesQuery } from "@lib/apis/queries";

import type { NoteInfoPanelProps } from "./NoteInfoPanel.type";
import { NoteInfoPanelProcessing, NoteInfoPanelRelated, NoteInfoPanelSource } from "./components";

const NoteInfoPanel = ({ noteNumber, noteDetail, streamPhase }: NoteInfoPanelProps) => {
  const { data: noteActions } = useNoteActionsQuery({ noteNumber });
  const { data: relatedData } = useRelatedNotesQuery({ noteNumber, limit: 5 });

  const processingStatus = noteDetail?.processing_status ?? "pending";
  const actions = noteActions?.length ? noteActions : (noteDetail?.action_items ?? []);
  const relatedNotes = relatedData?.items ?? [];

  return (
    <aside className="flex h-full w-[32rem] shrink-0 flex-col overflow-y-auto border-l border-[var(--color-divider-lighter)]">
      <NoteInfoPanelProcessing
        noteNumber={noteNumber}
        processingStatus={processingStatus}
        streamPhase={streamPhase}
        summary={noteDetail?.summary ?? undefined}
      />

      <NoteInfoPanelSource
        noteDetail={noteDetail}
        actions={actions}
      />

      <NoteInfoPanelRelated relatedNotes={relatedNotes} />
    </aside>
  );
};

export default NoteInfoPanel;
