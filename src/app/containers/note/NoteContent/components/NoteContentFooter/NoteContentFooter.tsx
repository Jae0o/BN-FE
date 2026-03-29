import { useRelatedNotesQuery } from "@lib/apis/queries";
import { useNoteStore } from "@lib/stores";

import type { NoteContentFooterProps } from "./NoteContentFooter.type";

const RELATED_LIMIT = 5;

const NoteContentFooter = ({ noteNumber, attachmentCount }: NoteContentFooterProps) => {
  const selectNote = useNoteStore(state => state.selectNote);
  const { data: relatedData } = useRelatedNotesQuery({ noteNumber, limit: RELATED_LIMIT });

  const relatedNotes = relatedData?.items ?? [];

  return (
    <footer className="flex flex-col gap-[1.6rem] border-t border-[var(--color-divider-lighter)] px-[2.4rem] py-[1.6rem]">
      <section className="flex flex-col gap-[0.8rem]">
        <h3 className="text-[1.2rem] font-semibold text-[var(--color-text-secondary)]">
          첨부파일 ({attachmentCount})
        </h3>

        {attachmentCount === 0 ? (
          <p className="text-[1.3rem] text-[var(--color-text-help)]">첨부파일 없음</p>
        ) : (
          <p className="text-[1.3rem] text-[var(--color-text-help)]">
            {attachmentCount}개의 첨부파일
          </p>
        )}
      </section>

      <section className="flex flex-col gap-[0.8rem]">
        <h3 className="text-[1.2rem] font-semibold text-[var(--color-text-secondary)]">
          관련 노트
        </h3>

        {relatedNotes.length === 0 ? (
          <p className="text-[1.3rem] text-[var(--color-text-help)]">관련 노트 없음</p>
        ) : (
          <ul className="flex flex-col gap-[0.4rem]">
            {relatedNotes.map(note => (
              <li key={note.note_number}>
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-[0.6rem] px-[1rem] py-[0.6rem] text-left hover:bg-[var(--color-gray-bg)]"
                  onClick={() => selectNote(note.note_number)}
                >
                  <p className="truncate text-[1.4rem] font-semibold text-[var(--color-text-primary)]">
                    {note.title || "제목 없음"}
                  </p>

                  <p className="truncate text-[1.2rem] text-[var(--color-text-help)]">
                    {note.summary || "요약 없음"}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </footer>
  );
};

export default NoteContentFooter;
