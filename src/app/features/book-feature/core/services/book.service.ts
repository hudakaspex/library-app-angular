import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, map, switchMap } from "rxjs";
import { Book } from "../models/book.model";
import { PageService } from "app/core/services/page.service";
import { AbstractCrudService } from "app/core/services/abstractCrudService";

const bookApi = "/api/books";

@Injectable()
export class BookService extends AbstractCrudService<Book> {
  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, bookApi)
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
}
