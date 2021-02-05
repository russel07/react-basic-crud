import React from "react";
import BookDataService from "../services/book.service";
import {Link } from "react-router-dom";

class BookList extends React.Component {
    constructor(propes){
        super(propes);

        this.state = {
            books: [],
            currentBook: null,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount = () => {
        this.retriveBooks();
    }

    retriveBooks(){
        BookDataService.getAll()
        .then(response => {
            this.setState({
                books: response.data 
            });
        })
    }


    searchTitle = () => {
        BookDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                books: response.data
            });
        }).catch(e =>{
            console.log(e);
        })
    }

    setActiveBook = ( book, index) => {
        this.setState({
            currentIndex: index,
            currentBook: book
        });
    }

    onChangeSearchTitle = (e) => {
        this.setState({
            searchTitle: e.target.value
        })
    }

    deleteBookById = (id) => {
        BookDataService.delete(id)
        .then(response => {
            this.retriveBooks();
            this.setState({
                currentIndex: -1,
                currentBook: null
            });
        })
        .catch(e => {
            console.log(e)
        })
    }

    render(){
        const {books, currentIndex, currentBook, searchTitle} = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={searchTitle} onChange={this.onChangeSearchTitle} placeholder="Search by title"/>

                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}> Search </button>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <h4>Book List</h4>
                    <ul className="list-group">
                        {books && 
                        books.map((book, index) =>(
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            key={index} onClick={ () => this.setActiveBook(book, index)}>
                            {book.title}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentBook? (
                        <div>
                            <h4>Details View</h4>
                            <div>
                                <label> Title: {" "}{currentBook.title}</label>
                            </div>
                            <div>
                                <label> Author: {" "}{currentBook.author}</label>
                            </div>
                            <div>
                                <label> Description: {" "}{currentBook.description}</label>
                            </div>
                            <div>
                                <Link to={"/book/"+currentBook.id} className="btn btn-warning mr-2">Edit</Link>
                                <button type="button" className="btn btn-danger" onClick={() => this.deleteBookById(currentBook.id)}>Delete</button>
                            </div>
                        </div> 
                    ) : (
                        <div>
                        <br />
                        <p>Please click on a Book...</p>
                      </div> 
                    )}
                </div>
            </div>
        )
    }
}

export default BookList;