import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './bootstrap.min.css'

// Import components
import AddBook from "./components/add-book.component";
import EditBook from "./components/edit-book.component";
import BookList from "./components/book-list.component";
import RegisterUser from "./components/register-user.component";

// Import logo
import logo from "./logo.png";

// App class
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/" target="_blank">
              <img src={logo} width="30" height="30" alt="BookApp" />
            </a>
            <Link to="/" className="navbar-brand">BookApp</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Books</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/addbook" className="nav-link">Add Book</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={BookList} />
          <Route path="/book/:id" component={EditBook} />
          <Route path="/addbook" component={AddBook} />
          <Route path="/register" component={RegisterUser} />
        </div>
      </Router>
    );
  }
}

export default App;
