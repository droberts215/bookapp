import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
    <tr>
        <td><a href={props.book.webLink} target="_blank" rel="noopener noreferrer">{props.book.name}</a></td>
        <td>{props.book.author}</td>
        <td>{props.book.readCount}</td>
        <td>{props.book.lastReadDate}</td>
        <td>
            <Link to={"/book/"+props.book._id}>Edit</Link>
        </td>
    </tr>
)

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    // Request book list from database
    componentDidMount() {
        axios.get('http://localhost:4001/api/booklist')
            .then(response => {
                console.log(response);
                this.setState({ books: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // Iterate through book list to display in table
    bookList() {
        return this.state.books.map(function(currentBook, i){
            return <Book book={currentBook} key={i} />;
        })
    }

    // Render book list on page
    render() {
        return (
            <div>
                <h3>Reading List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Read Count</th>
                            <th>Last Read Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.bookList() }
                    </tbody>
                </table>
            </div>
        )
    }
}