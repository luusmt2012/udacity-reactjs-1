import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { getAll, update } from '../BooksAPI';
import { BOOK } from '../contants';
import ListBooks from '../components/ListBooks';

function MyReads() {

  const [myBooksState, setMyBooksState] = useState({});
  useEffect(()=>{
    const getBook = async () => {
      const books = await getAll();
      const myBooks = {
        [BOOK.STATUS.CURRENTLYREADING]: [],
        [BOOK.STATUS.WANTTOREAD]: [],
        [BOOK.STATUS.READ]: [],
      };
      books.forEach(book => {
        if(book.shelf) {
          myBooks[book.shelf].push(book);
        }
      });
      setMyBooksState(myBooks);
    } 
    getBook()
  },[]);

  const onChangeBookShelf = (bookId, preShelf, newShelf) => {
    const newMyBooksState = cloneDeep(myBooksState);
    const preShelfBookIndex = newMyBooksState[preShelf].findIndex((book) => book.id === bookId);
    newMyBooksState[preShelf][preShelfBookIndex].shelf = newShelf;
    if(newShelf !== 'none') {
      newMyBooksState[newShelf].push(newMyBooksState[preShelf][preShelfBookIndex]);
    }
    newMyBooksState[preShelf].splice(preShelfBookIndex, 1);
    setMyBooksState(newMyBooksState);
    update(bookId, newShelf)
  }

    return (
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(myBooksState[BOOK.STATUS.CURRENTLYREADING] || []).map((book) => <ListBooks onChangeBookShelf={onChangeBookShelf} bookId={book.id} currShelf={book.shelf} key={book.id} imageUrl={book.imageLinks.thumbnail} title={book.title} authors={book.authors}/>)}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(myBooksState[BOOK.STATUS.WANTTOREAD] || []).map((book) => <ListBooks onChangeBookShelf={onChangeBookShelf} bookId={book.id} currShelf={book.shelf} key={book.id} imageUrl={book.imageLinks.thumbnail} title={book.title} authors={book.authors}/>)}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(myBooksState[BOOK.STATUS.READ] || []).map((book) => <ListBooks onChangeBookShelf={onChangeBookShelf} bookId={book.id} currShelf={book.shelf} key={book.id} imageUrl={book.imageLinks.thumbnail} title={book.title} authors={book.authors}/>)}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
        </div>
    );
  }
  
  export default MyReads;
  