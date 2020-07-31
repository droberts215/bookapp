import React, { Component } from 'react';
import axios from 'axios';

export default class AddBook extends Component {
    constructor(props) {
        super(props);

        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
        this.onChangeBookWebLink = this.onChangeBookWebLink.bind(this);
        this.onChangeBookReadCount = this.onChangeBookReadCount.bind(this);
        this.onChangeBookLastReadDate = this.onChangeBookLastReadDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            author: '',
            webLink: '',
            readCount: 0,
            lastReadDate: null
        }
    }

    onChangeBookName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeBookAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeBookWebLink(e) {
        this.setState({
            webLink: e.target.value
        });
    }
    
    onChangeBookReadCount(e) {
        this.setState({
            readCount: e.target.value
        });
    }

    onChangeBookLastReadDate(e) {
        this.setState({
            lastReadDate: e.target.value
        });
    }

    // Submit book to database
    onSubmit(e) {
        e.preventDefault();
        
        const newBook = {
            name: this.state.name,
            author: this.state.author,
            webLink: this.state.webLink,
            readCount: this.state.readCount,
            lastReadDate: this.state.lastReadDate
        }
        console.log('Book added.\n' + newBook); 

        axios.post('http://localhost:4001/api/addbook', newBook)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            author: '',
            webLink: '',
            readCount: 0,
            lastReadDate: ''
        })

        this.props.history.push('/');
    }

    // Render book form on page
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Book</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeBookName}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.author}
                                onChange={this.onChangeBookAuthor}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Web Link: </label>
                        <input 
                                type="url" 
                                className="form-control"
                                value={this.state.webLink}
                                onChange={this.onChangeBookWebLink}
                                />
                    </div>
                    <div className="form-group">
                        <label>How Many Times Have You Read It?: </label>
                        <input 
                                type="number" 
                                className="form-control"
                                min="0"
                                value={this.state.readCount}
                                onChange={this.onChangeBookReadCount}
                                />
                    </div>
                    <div className="form-group">
                        <label>When Did You Read It Last?: </label>
                        <input 
                                type="date" 
                                className="form-control"
                                value={this.state.lastReadDate}
                                onChange={this.onChangeBookLastReadDate}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Book" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}