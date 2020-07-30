import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from './book';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  // Retrieve books
  getBooks() {
    return this.http.get<Book[]>('http://localhost:3000/api/booklist')
      .pipe(map(res => res));
  }

  // Add book
  addBook(newBook) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/addbook', newBook);
  }

  // Delete book
  deleteBook(id) {
    return this.http.delete('http://localhost:3000/api/delbook/' + id);
  }
}
