import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Books from './Books';
import PropTypes from 'prop-types';

class BookSearch extends Component{
    static propTypes = {
        moveBook: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        currentBooks: PropTypes.array.isRequired
    }
    state={
        search:'',
        books:[],
        showEmpty:false
    }
    timer = null;
    changeHandle = (event) => {
       const svalue=event.target.value
        clearTimeout(this.timer);

        this.setState({ search:svalue });
       
        this.timer =   setTimeout(() => {
            this.searchBook(svalue)
          }, 1000);
    }
    searchBook = (query)=>{
        if(query){
            BooksAPI.search(query)
            .then((books)=>{
                if(!books.error){
                    this.setState({ 
                        books:books.map(b => {
                            const tempbook = Object.assign({}, b);
                            const book=this.props.currentBooks.find(book=>book.id===b.id)
                            if(book){
                                tempbook.shelf=book.shelf;
                            }
                            return tempbook;
                          }),
                        showEmpty:false 
                    });
                }else{
                    this.setState({ 
                        books:[],
                        showEmpty:true
                     })
                }
            });
        }else{
            this.setState({ 
                books:[],
                showEmpty:false
             })
        }
        
    }
    handleClick=()=>{
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.handleClick}>Close</button>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    value={this.state.search} 
                    onChange={this.changeHandle} 
                    placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
                <Books 
                    books={this.state.books} 
                    moveBook={this.props.moveBook} 
                    step='new'
                />
                {(this.state.showEmpty)&&
                    <div className="text-center">
                        <p style={{"text-align": "center"}}>No book found!</p>
                    </div>
                }
            </div>
            
          </div>   
        )
    }
}

export default BookSearch;