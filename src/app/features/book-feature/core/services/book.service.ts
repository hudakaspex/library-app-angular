import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map, switchMap } from "rxjs";
import { Book } from "../models/book.model";
import { PageEvent } from "app/core/models/page-event";
import { PageService } from "app/core/services/page.service";

@Injectable()
export class BookService {
  private bookApi = "/api/books";

  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) { }

  public getBooks(): Observable<Book[]> {
    return this.httpClient.get(`${environment.serverUrl}${this.bookApi}`).pipe(
      map((books: Book[]) => {
        return books.map((book) => new Book(book));
      })
    );
  }

  public addBook(book: Book) {
    return this.httpClient.post(`${environment.serverUrl}${this.bookApi}`, book);
  }

  public deleteBook(id: number) {
    return this.httpClient.delete(`${environment.serverUrl}${this.bookApi}/${id}`);
  }

  public updateBook(book: Book) {
    return this.httpClient.put(
      `${environment.serverUrl}${this.bookApi}/${book.id}`,
      book
    );
  }

  public books$(): Observable<{
    total: number;
    data: Book[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        params = params.append("title", this.pageService.page.search);
        return this.httpClient.get<{
          total: number;
          data: Book[];
        }>(`${environment.serverUrl}${this.bookApi}`, { params });
      })
    );
  }

  public updatePagination(
    pageSize: number,
    pageNumber: number
  ) {
    this.pageService.updatePagination(pageSize, pageNumber);
  }

  public searchBook(search = this.pageService.page.search) {
    this.pageService.onSearch(search);
  }
}
