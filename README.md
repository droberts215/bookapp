# bookapp
> A MERN application to log and analyze your reading history.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Credits](#credits)
* [Contact](#contact)

## General info
Reading a book before bedtime is a common practice for both children and adults. Having spent many nights wondering which book to pick next in my child's "read it again" rotation, I began thinking of a way to log reading history and run simple analytics on the data to tell me which books were being favored over others. Upon completion, I plan to load this onto a small AWS Lightsail instance and use it as a personal utility app.

## Technologies
* MongoDB - version 4.2.8
* Express - version 4.17.1
* React - version 16.13.1
* Node.js - version 12.8.3
* Additional software dependencies listed in package.json and bookapp/package.json

## Setup
Install MongoDB and NodeJS using set up tutorials linked below. Then, using NodeJS command line, create new app directory. Run NPM to install all dependencies. Modify the code as desired using VSCode (or your preferred editor). I didn't include the .env file so you'll need to add one in the root directory with the following values:
* SERVER_PORT
* DB (MongoDB address)
* SESSION_KEY (not in use currently but kept in for future)

I used Postman, Nodemon, and Firefox's dev tools for testing.

## Screenshots
![Book List](https://raw.githubusercontent.com/droberts215/bookapp/master/screenshots/BookList.PNG)
![Add Book](https://raw.githubusercontent.com/droberts215/bookapp/master/screenshots/AddBook.PNG)
![Edit Book](https://raw.githubusercontent.com/droberts215/bookapp/master/screenshots/EditBook.PNG)

## Features
List of features ready and TODOs for future development
* Display a list of books, each with the following data: name (encoded web link for re-purchasing when it mysteriously disappears), author, read count, last read date
* Add new books
* Edit a book's web link, read count, and last read date

To-do list:
* Format the lastReadDate value to remove the time string
* Add user functionality to individualize reading history logging. Users will still share a common book database to save server memory but the readCount and lastReadDate values will be nested in a readLog array that stores them per user.
* Login and register pages once user functionality is added
* Graphical representation of book list data - bubble, radial, heat graph?
* Other fun and moderately useful things ...

## Status
Project is: _in progress_

## Credits
* Mongo, Express, & NodeJS config and coding references: 
  * https://www.youtube.com/watch?v=wtIvu085uU0
  * "Express In Action" by Evan M. Hahn
* MERN stack config and coding reference: https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1
* READme reference: https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project

## Contact
Created by [@droberts215](https://github.com/droberts215/)
