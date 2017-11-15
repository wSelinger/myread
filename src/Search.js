import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid.js'

class Search extends React.Component {
  state = {
    result: []
  }

  constructor() {
    super()
    console.log("Constructed: ", this)
  }


  search(searchCriteria) {
    console.log("searching: ", searchCriteria)
    if (searchCriteria.trim().length === 0) {
      this.setState({result: []})
      return
    }

    const maxResults = 10
    BooksAPI.search(searchCriteria, maxResults)
      .then((books) => {this.setState({result: books.items || books})})
      .catch((err) => console.log(err))
  }

  /* for getting books with their current shelf correctly set, replace search result items with their corresponding shelved books */
  mergedResult(books, shelvedBooks) {
    const merged = books.map(book => shelvedBooks.find(s => s.id === book.id) || book)
    console.log("Merging search result with shelves: ", books, shelvedBooks, merged)
    return merged
  }

  render() {
    console.log("rendering ", this.state.result)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={event => this.search(event.target.value)} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.mergedResult(this.state.result, this.props.books)} onShelfUpdate={this.props.onShelfUpdate}/>
        </div>
      </div>
    )
  }
}

export default Search
