import { useState } from "react";
import { Link } from 'react-router-dom';
import { cloneDeep, debounce } from 'lodash';

import { getAll, search, update } from '../BooksAPI';
import ListBooks from "../components/ListBooks";

function Search() {
  const [listBooks, setListBooks] = useState([]);

  const debounceDropDown = debounce((nextValue) => {
    const searchBook = async (text) => {
      const books = await search(text, 10);
      if (!books.error) {
        const myBooksNow = await getAll();
        const bookWithShelf = books.map((book) => {
          const mybook = myBooksNow.find((item) => item.id === book.id)
          if(mybook) {
            book.shelf = mybook.shelf
          }
          return book;
        })
        setListBooks(bookWithShelf);
      } else {
        setListBooks([])
      }

    }
    searchBook(nextValue)
  }, 300)

  const onChangeSearch = (e) => {
    const value = e.target.value;
    debounceDropDown(value);
  }

  const onChangeBookShelf = (bookId, preShelf, newShelf) => {
    const newListBooks = cloneDeep(listBooks);
    const bookNeedChangeIndex = newListBooks.findIndex((book) => book.id === bookId);
    newListBooks[bookNeedChangeIndex].shelf = newShelf;
    setListBooks(newListBooks);
    update(bookId, newShelf)
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to='/'
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={onChangeSearch}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {listBooks.map(book => <ListBooks onChangeBookShelf={onChangeBookShelf} bookId={book.id} currShelf={book.shelf} key={book.id} imageUrl={book.imageLinks?.thumbnail} title={book.title} authors={book.authors} />)}
        </ol>
      </div>
    </div>
  );
}

export default Search;
