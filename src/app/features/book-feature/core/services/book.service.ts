import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map } from "rxjs";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BookService {
  
  constructor(
    private httpClient: HttpClient
  ) {}

  public getBooks(): Observable<Book[]> {
    return this.httpClient.get(`${environment.serverUrl}/api/books`)
    .pipe(
      map((books: Book[]) => {
        return books.map(book => new Book(book))
      })
    );
  }

  public addBook(book: Book) {
    return this.httpClient.post(`${environment.serverUrl}/api/books`, book);
  }

  public deleteBook(id: number) {
    return this.httpClient.delete(`${environment.serverUrl}/api/books/${id}`);
  }

  public updateBook(book: Book) {
    return this.httpClient.put(`${environment.serverUrl}/api/books/${book.id}`, book);
  }
}
