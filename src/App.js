import './App.css';
import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import BookList from './components/book-list.component';
import Book from './components/book.component';
import AddBook from './components/add-book.component';


function App() {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/books" className="navbar-brand">
            SS
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BookList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/book/:id" component={Book} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
