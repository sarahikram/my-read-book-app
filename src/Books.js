import React from 'react';
import PropTypes from 'prop-types';

const Books = props => {
    const { books, moveBook , step} = props;
    return(
        <ol className="books-grid">
            {books.map((book)=>(
                     <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:(book.imageLinks)? 'url('+book.imageLinks.thumbnail+')':'none' }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e)=>{moveBook(e.target.value,book,step)}} value={(book.shelf)?book.shelf:'none'}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{(book.authors)?book.authors:'-'}</div>
                    </div>
                </li> 
            
            ))}
        </ol>      
    )
}
Books.propTypes = {
    step: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
}
export default React.memo(Books);