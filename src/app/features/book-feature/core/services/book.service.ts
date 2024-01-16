import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map, shareReplay } from "rxjs";
import { Book } from "../models/book.model";
import { PaginationConfig } from "app/core/models/pagination-config";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this.httpClient.get(`${environment.serverUrl}/api/books`).pipe(
      map((books: Book[]) => {
        return books.map((book) => new Book(book));
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
    return this.httpClient.put(
      `${environment.serverUrl}/api/books/${book.id}`,
      book
    );
  }

  public searchByTitle(
    title: string,
    pageSize = PaginationConfig.pageSize,
    pageNumber = 0
  ): Observable<{
    total: number;
    data: Book[];
  }> {
    let params = new HttpParams();
    params = params.append("title", title);
    params = params.append("pageSize", pageSize);
    params = params.append("pageNumber", pageNumber);
    return this.httpClient.get<{
      total: number;
      data: Book[];
    }>(`${environment.serverUrl}/api/books`, { params });
  }
}
