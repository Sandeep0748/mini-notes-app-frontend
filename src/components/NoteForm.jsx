import './NoteForm.css'
import { useState, useEffect } from 'react'

function NoteForm({ onSubmit, initialNote, onCancel, isLoading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title)
      setDescription(initialNote.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [initialNote])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(title, description)
      setTitle('')
      setDescription('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{initialNote ? 'Edit Note' : 'Create Note'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          maxLength={100}
        />
        <span className="char-count">{title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter note description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
          rows="8"
          maxLength={1000}
        />
        <span className="char-count">{description.length}/1000</span>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={submitting || isLoading}
          className="btn-primary"
        >
          {submitting ? 'Saving...' : initialNote ? 'Update Note' : 'Create Note'}
        </button>
        {initialNote && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default NoteForm
