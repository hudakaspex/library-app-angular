import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map, switchMap } from "rxjs";
import { Book } from "../models/book.model";
import { PageEvent } from "app/core/models/page-event";
import { PageService } from "app/core/services/page.service";

@Injectable()
export class BookService {

  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) {}

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

  public books$(): Observable<{
    total: number;
    data: Book[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((pageEvent: PageEvent) => {
        let params = new HttpParams();
        params = params.append("title", pageEvent.search);
        params = params.append("pageSize", pageEvent.pageSize);
        params = params.append("pageNumber", pageEvent.pageNumber);
        return this.httpClient.get<{
          total: number;
          data: Book[];
        }>(`${environment.serverUrl}/api/books`, { params });
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
    this.pageService.updateSearch(search);
  }
}
