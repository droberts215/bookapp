import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookService]
})
export class BooksComponent implements OnInit {
  books: Book[];
  book: Book;
  name: String;
  author: String;
  webLink: String;
  readCount: Number;
  lastReadDate: Date;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Grab book list on init
    this.bookService.getBooks().subscribe( books => this.books = books);

  }

}
