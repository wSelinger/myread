import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Main from './Main.js'
import Search from './Search.js'
import './App.css'

/*
Application component containing the root app state and the app's UI.
App state consists of list of shelved books stored with key "books".
If a book is unshelved (by setting book.shelf to "None" via function updateShelf),
the book is removed from the list.

UI consists of 2 pages (Main, Search) managed by Routes.
*/
class BooksApp extends React.Component {
  // See https://reactjs.org/docs/react-component.html#constructor
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {this.setState({ books })})
      .catch((err) => console.log(err))
  }

  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then((bookIdsByShelve) => {this.updateShelves(book, shelf)})
      .catch((err) => console.log(err))
  }

  updateShelves(addedOrUpdatedBook, newShelf) {
    this.setState(state => {
      let books = state.books.filter(book => book.id !== addedOrUpdatedBook.id)
      if (newShelf !== 'none') {
        books = books.concat({
          ...addedOrUpdatedBook,
          shelf: newShelf
        })
      }
      return { books }
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Main
              books={this.state.books}
              onShelfUpdate={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onShelfUpdate={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
