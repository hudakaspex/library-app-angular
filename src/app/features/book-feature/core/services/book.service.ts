import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map, switchMap } from "rxjs";
import { Book } from "../models/book.model";
import { PageService } from "app/core/services/page.service";
import { AbstractCrudService } from "app/core/services/abstractCrudService";
import { Author } from "app/features/author-feature/core/models/author.model";

const bookApi = `/api/books`;
const authorApi = `${environment.serverUrl}/api/authors`;

@Injectable()
export class BookService extends AbstractCrudService<Book> {
  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, bookApi)
  }

  public getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.serverUrl}${bookApi}/${id}`);
  }

  protected createModel(data: Book): Book {
    return new Book(data);
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
        }>(`${environment.serverUrl}${bookApi}`, { params });
      }),
      map(result => {
        result.data = result.data.map(this.createModel);
        return result;
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

  public getAuthors(): Observable<Author[]> {
    const authors$ = this.httpClient.get(`${authorApi}`).pipe(map((authors: Author[]) => {
      return authors.map(val => new Author(val));
    }));
    return authors$;
  }
}
