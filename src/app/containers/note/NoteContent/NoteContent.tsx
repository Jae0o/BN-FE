import { FormProvider } from "react-hook-form";

import { useNoteStream } from "@lib/hooks";

import type { NoteContentProps } from "./NoteContent.type";
import { NoteContentBody, NoteContentFooter, NoteContentHeader } from "./components";
import { useNoteEditor } from "./hooks";

const NoteContent = ({ noteNumber, noteDetail }: NoteContentProps) => {
  const { subscribe } = useNoteStream({ noteNumber, enabled: false });

  const { form, saveStatus } = useNoteEditor({
    noteNumber,
    noteDetail,
    onSaveSuccess: subscribe,
  });

  const processingStatus = noteDetail?.processing_status ?? "pending";
  const tags = noteDetail?.tags ?? [];
  const attachmentCount = noteDetail?.attachment_count ?? 0;

  return (
    <FormProvider {...form}>
      <article className="flex min-w-0 grow-1 h-full flex-col">
        <NoteContentHeader
          noteNumber={noteNumber}
          saveStatus={saveStatus}
          processingStatus={processingStatus}
          tags={tags}
        />

        <NoteContentBody />

        <NoteContentFooter attachmentCount={attachmentCount} />
      </article>
    </FormProvider>
  );
};

export default NoteContent;
