import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Main from './Main.js'
import Search from './Search.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    console.log("Fetching books via getAll")
    BooksAPI.getAll()
      .then((books) => {this.setState({ books })})
      .catch((err) => console.log(err))
  }

  updateShelf(book, shelf) {
    console.log("Updating bookshelf: ", book, "shelf: ", shelf)

    BooksAPI.update(book, shelf)
      .then((bookIdsByShelve) => {this.updateShelves(book, shelf)})
      .catch((err) => console.log(err))
  }

  updateShelves(addedOrUpdatedBook, newShelf) {
    console.log('book:', addedOrUpdatedBook, 'shelf:', newShelf)
    this.setState(state => {
      let books = state.books.filter(book => book.id !== addedOrUpdatedBook.id)
      if (newShelf !== 'none') {
        books = books.concat({
          ...addedOrUpdatedBook,
          shelf: newShelf
        })
      }
      console.log("Updated books: ", books)
      return { books }
    })
  }

  render() {
    console.log("Render app, books: ", this.state.books)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main books={this.state.books} onShelfUpdate={(book, shelf) => this.updateShelf(book, shelf)}/>
        )} />
        <Route path="/search" render={() => (
          <Search books={this.state.books} onShelfUpdate={(book, shelf) => this.updateShelf(book, shelf)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
