function ListBooks({ onChangeBookShelf, bookId, currShelf, imageUrl, title, authors }) {
    return (                    <li>
        <div className="book" >
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url(${imageUrl})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value={currShelf || 'none'} onChange={(e) => onChangeBookShelf(bookId, currShelf, e.target.value)}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors ? authors.join(',') : ''}</div>
        </div>
      </li>)
}

export default ListBooks;
