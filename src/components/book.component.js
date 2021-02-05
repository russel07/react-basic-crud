import React from "react";
import BookDataService from "../services/book.service";

class Book extends React.Component {
    constructor(propes){
        super(propes);

        this.state = {
            currentBook: {
                id: null,
                title: '',
                author: '',
                description: ''
            },
            message: ''
        }
    }

    componentDidMount(){
        this.getbook(this.props.match.params.id);
    }

    getbook = (id) => {
        BookDataService.get(id)
        .then(response => {
            this.setState({
                currentBook: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    onChnageTitle = (e) => {
        this.setState(prevState =>{
            return {
                currentBook:{
                    ...prevState.currentBook,
                    title: e.target.value
                }
            }
        });
    }

    onChangeAuthor = (e) => {
        this.setState(prevState =>{
            return {
                currentBook:{
                    ...prevState.currentBook,
                    author: e.target.value
                }
            }
        });
    }

    onChangeDescription = (e) => {
        this.setState(prevState =>{
            return {
                currentBook:{
                    ...prevState.currentBook,
                    description: e.target.value
                }
            }
        });
    }

    updateIBook = () =>{
        BookDataService.update(this.state.currentBook.id, this.state.currentBook)
        .then(response => {
            this.setState({
                message: "The book information updated sucessfully"
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    render(){
        const {currentBook, message} = this.state;
        return (
            <div>
                {currentBook ? (
                    <div className="edit-form">
                        <h4>Edit Book</h4>

                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" value={currentBook.title} name="title" onChange={this.onChnageTitle} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input type="text" className="form-control" id="author" value={currentBook.author} name="author" onChange={this.onChangeAuthor} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" id="description" value={currentBook.description} name="description" onChange={this.onChangeDescription} required/>
                            </div>

                            <div className="text-center">
                                <button type="button" className="btn btn-success" onClick={this.updateIBook}>
                                    Update
                                </button>
                                {message ? (
                                <div className="alert alert-success">
                                    <p>{this.state.message}</p>
                                </div>
                                ) : ("")}
                            </div> 
                        </form>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>No book found</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Book