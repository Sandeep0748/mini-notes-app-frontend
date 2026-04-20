import './NoteList.css'
import NoteCard from './NoteCard'

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default NoteList
