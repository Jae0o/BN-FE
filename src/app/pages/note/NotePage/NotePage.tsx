import { NoteAsidePanel, NoteContent } from "@app/containers";

const NotePage = () => {
  return (
    <div className="flex h-full">
      <NoteAsidePanel />
      <NoteContent />
      {/* NoteInfoPanel */}
    </div>
  );
};

export default NotePage;
