import React from "react";
import BookDataService from "../services/book.service";

class Addbook extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: null,
            title: "",
            description: "",
            author: "",
            submitted: false
        }
    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    } 

    onChangeAuthor = (e) => {
        this.setState({
          author: e.target.value
        });
    }

    onChangeDescription = (e) => {
        this.setState({
          description: e.target.value
        });
    }

    saveBook = (e) => {
        let data = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description
        }

        BookDataService.create(data)
        .then(response => {
            console.log(response.data)
            this.setState({
                id: response.data.id,
                title: response.data.title,
                author: response.data.author,
                description: response.data.description,
                submitted: true
            });
        }).catch( e => {
            console.log(e)
        });
    }

    newBook = () => {
        this.setState({
            id: null,
            title: "",
            description: "",
            author: "",
            submitted: false
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newBook}>
                            Add
                        </button>
                  </div>
                ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" value={this.state.title} name="title" onChange={this.onChangeTitle} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" value={this.state.author} name="author" onChange={this.onChangeAuthor} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" value={this.state.description} name="description" onChange={this.onChangeDescription} required/>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success" onClick={this.saveBook}>
                            Submit
                        </button>
                    </div>                    
                </div>
                )}
            </div>
        )
    }
}

export default Addbook;
