import React from 'react'

const BooksGrid = ({books, onShelfUpdate}) => (
  <ol className="books-grid">
  {books.map((book) => (
    <li key={book.id}>
      <Book book={book} onShelfUpdate={onShelfUpdate}/>
    </li>
  ))}
  </ol>
)

const Book = ({book, onShelfUpdate}) => {
  const {title, authors=[], imageLinks, shelf='none'}=book
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={event => {onShelfUpdate(book, event.target.value)}}>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors.map((author, index) => (
        <div className="book-authors" key={index}>{author}</div>
      ))}
    </div>
)
}

export default BooksGrid
