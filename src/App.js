import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

const shelfs=[{slug:'currentlyReading',title:'Currently Reading',books:[]},{slug:'wantToRead',title:'Want to Read',books:[]},{slug:'read',title:'Read',books:[]}]
class BooksApp extends React.Component {
  state = {
    books:[],
    shelfs:shelfs
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  shelfBooks=(shelf)=>{
    return this.state.books.filter(book=>book.shelf===shelf)
  }
  moveBook=(shelf,book,step)=>{
    BooksAPI.update(book,shelf,step)
    .then(() => {
      const inShelfBook=this.state.books.filter(b=>b.id===book.id)
            if(inShelfBook.length !== 0){
              step='move'; // when adding from search if book already in shelf
            }
      switch(step){
        case 'move':// book moved from one shelf to other
            this.setState(state => ({
              books :state.books.map(b => {
                const tempbook = Object.assign({}, b);
                if (b.id === book.id) {
                  tempbook.shelf=shelf;
                }
                return tempbook;
              })
            }));
            break;
        case 'new':// new book added to shelf from search page
            book.shelf=shelf
            this.setState((currentState) => ({
              books: currentState.books.concat([book])
            }))
            break;
        default:
            this.setState((currentState) => ({
              books: currentState.books
            }))
            break;

      }
    })
  }
  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={({history}) => (
            <BookSearch 
              history={history}
              moveBook={this.moveBook}
              currentBooks={this.state.books} 
            />
            )} />
          
          <Route exact path='/' render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  { shelfs.map(shelf=>(
                    <BookShelf key={shelf.slug} shelf={shelf} books={this.shelfBooks(shelf.slug)} moveBook={this.moveBook}/>
                  ))}
                </div>
              </div>
              <div className="open-search">
              <button onClick={() => history.push('/search')}>Add a book</button>
              </div>
            </div>
            )} />
      </div>
    )
  }
}

export default BooksApp
