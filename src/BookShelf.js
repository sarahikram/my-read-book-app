import React from 'react';
import Books from './Books';
import PropTypes from 'prop-types';

const BookShelf =props=>{
    const { shelf, books, moveBook } = props
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
                    {<Books books={books} moveBook={moveBook} step='move'/>}
            </div>
        </div>
    )
}
BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
}
export default BookShelf;