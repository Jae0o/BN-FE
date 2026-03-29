import { FormProvider } from "react-hook-form";

import { useNoteDetailQuery } from "@lib/apis/queries";
import { useNoteStream } from "@lib/hooks";
import { useNoteStore } from "@lib/stores";

import { NoteContentBody, NoteContentFooter, NoteContentHeader } from "./components";
import { useNoteEditor } from "./hooks";

const NoteContentView = ({ noteNumber }: { noteNumber: number }) => {
  const { data: noteDetail } = useNoteDetailQuery({ noteNumber });
  const { subscribe } = useNoteStream({ noteNumber, enabled: false });

  const { form, saveStatus } = useNoteEditor({
    noteNumber,
    onSaveSuccess: subscribe,
  });

  const processingStatus = noteDetail?.processing_status ?? "pending";
  const tags = noteDetail?.tags ?? [];
  const attachmentCount = noteDetail?.attachment_count ?? 0;

  return (
    <FormProvider {...form}>
      <article className="flex h-full flex-col">
        <NoteContentHeader
          noteNumber={noteNumber}
          saveStatus={saveStatus}
          processingStatus={processingStatus}
          tags={tags}
        />

        <NoteContentBody />

        <NoteContentFooter
          noteNumber={noteNumber}
          attachmentCount={attachmentCount}
        />
      </article>
    </FormProvider>
  );
};

const NoteContent = () => {
  const selectedNoteNumber = useNoteStore(state => state.selectedNoteNumber);

  if (selectedNoteNumber === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-[1.4rem] text-[var(--color-text-help)]">노트를 선택해주세요</p>
      </div>
    );
  }

  return (
    <NoteContentView
      key={selectedNoteNumber}
      noteNumber={selectedNoteNumber}
    />
  );
};

export default NoteContent;
