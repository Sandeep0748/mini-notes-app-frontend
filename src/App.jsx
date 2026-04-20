import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import SearchBar from './components/SearchBar'

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [editingNote, setEditingNote] = useState(null)

  const API_URL = '/api/notes'

  // Fetch all notes
  const fetchNotes = async (searchTerm = '') => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL, {
        params: { search: searchTerm }
      })
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
      alert('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchNotes()
  }, [])

  // Handle search
  useEffect(() => {
    fetchNotes(search)
  }, [search])

  // Handle create note
  const handleCreateNote = async (title, description) => {
    try {
      await axios.post(API_URL, { title, description })
      fetchNotes(search)
    } catch (error) {
      console.error('Error creating note:', error)
      alert('Failed to create note')
    }
  }

  // Handle update note
  const handleUpdateNote = async (id, title, description) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title, description })
      setEditingNote(null)
      fetchNotes(search)
    } catch (error) {
      console.error('Error updating note:', error)
      alert('Failed to update note')
    }
  }

  // Handle delete note
  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        fetchNotes(search)
      } catch (error) {
        console.error('Error deleting note:', error)
        alert('Failed to delete note')
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Mini Notes App</h1>
        <p>Create, edit, and manage your notes</p>
      </header>

      <main className="app-container">
        <div className="form-section">
          <NoteForm
            onSubmit={editingNote 
              ? (title, desc) => handleUpdateNote(editingNote._id, title, desc)
              : handleCreateNote
            }
            initialNote={editingNote}
            onCancel={() => setEditingNote(null)}
            isLoading={loading}
          />
        </div>

        <div className="notes-section">
          <SearchBar search={search} setSearch={setSearch} />
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes found. Create your first note!</p>
            </div>
          ) : (
            <NoteList
              notes={notes}
              onEdit={setEditingNote}
              onDelete={handleDeleteNote}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
