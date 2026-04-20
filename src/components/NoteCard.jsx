import './NoteCard.css'

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label="Edit note"
          >
            ✎
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(note._id)}
            title="Delete note"
            aria-label="Delete note"
          >
            🗑
          </button>
        </div>
      </div>

      <p className="note-description">{note.description}</p>

      <div className="note-footer">
        <span className="note-date">
          Created: {formatDate(note.createdDate)}
        </span>
        {note.updatedDate !== note.createdDate && (
          <span className="note-updated">
            Updated: {formatDate(note.updatedDate)}
          </span>
        )}
      </div>
    </div>
  )
}

export default NoteCard
