import { NoteAsidePanel, NoteContent, NoteInfoPanel } from "@app/containers";
import { useNoteDetailQuery } from "@lib/apis/queries";
import { useNoteStore } from "@lib/stores";

const NotePage = () => {
  const selectedNoteNumber = useNoteStore(state => state.selectedNoteNumber);
  const { data: noteDetail } = useNoteDetailQuery({ noteNumber: selectedNoteNumber });

  return (
    <div className="flex h-full">
      <NoteAsidePanel />

      {selectedNoteNumber === 0 ? (
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <p className="text-[1.4rem] text-[var(--color-text-help)]">노트를 선택해주세요</p>
        </div>
      ) : (
        <>
          <NoteContent
            key={selectedNoteNumber}
            noteNumber={selectedNoteNumber}
            noteDetail={noteDetail}
          />
          <NoteInfoPanel
            key={selectedNoteNumber}
            noteNumber={selectedNoteNumber}
            noteDetail={noteDetail}
          />
        </>
      )}
    </div>
  );
};

export default NotePage;
