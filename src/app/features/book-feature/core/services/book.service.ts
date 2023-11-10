import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BookService {
  
  constructor(
    private httpClient: HttpClient
  ) {}

  public getBooks(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/books`);
  }

  public addBook(book: Book) {
    return this.httpClient.post(`${environment.serverUrl}/api/books`, book);
  }
}
