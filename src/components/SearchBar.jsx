import './SearchBar.css'

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search notes by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {search && (
        <button
          className="clear-search"
          onClick={() => setSearch('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
