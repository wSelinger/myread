import React from 'react'
import {Link} from 'react-router-dom'
import BooksGrid from './BooksGrid.js'

class Main extends React.Component {
  render() {
    const {books, onShelfUpdate} = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf name="Currently Reading" books={books.filter(book => book.shelf === 'currentlyReading')} onShelfUpdate={onShelfUpdate}/>
            <BookShelf name="Want to Read" books={books.filter(book => book.shelf === 'wantToRead')} onShelfUpdate={onShelfUpdate}/>
            <BookShelf name="Read" books={books.filter(book => book.shelf === 'read')} onShelfUpdate={onShelfUpdate}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

const BookShelf = ({name, books, onShelfUpdate}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{name}</h2>
    <div className="bookshelf-books">
      <BooksGrid books={books} onShelfUpdate={onShelfUpdate}/>
    </div>
  </div>
)

export default Main
