import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid.js'
import { Debounce } from 'react-throttle'

/*
Search page of the app.
Maintains its own state representing the search criteria and search result retrieved via books API.

Note: The search API does not return book shelves. Since book shelves of books in search result must be shown with current values,
books in the search result are replaced by their corresponding shelved book instances passed in from parent component.
Also, changes in shelves are not handled by Search itself, but forwarded to the parent via handler function passed in props.
*/

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }

  search(searchCriteria) {
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
    return books.map(book => shelvedBooks.find(s => s.id === book.id) || book)
  }

  render() {
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
            {
            // See https://www.npmjs.com/package/react-throttle (-> yarn add react-throttle --save-prod)
            }
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                onChange={event => this.search(event.target.value)}
                placeholder="Search by title or author"
              />
          </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.mergedResult(this.state.result, this.props.books)}
            onShelfUpdate={this.props.onShelfUpdate}
          />
        </div>
      </div>
    )
  }
}

export default Search
