import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageService } from "app/core/services/page.service";
import { environment } from "environments/environment";
import { Author } from "../models/author.model";
import { map, Observable, switchMap } from "rxjs";

@Injectable()
export class AuthorService {
  private authorApi = "/api/authors";

  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) { }

  public getAuthors(): Observable<Author[]> {
    return this.httpClient.get(`${environment.serverUrl}${this.authorApi}`).pipe(
      map((authors: Author[]) => {
        return authors.map((author) => new Author(author));
      })
    );
  }

  public addAuthor(author: Author) {
    return this.httpClient.post(`${environment.serverUrl}${this.authorApi}`, author);
  }

  public deleteAuthor(id: number) {
    return this.httpClient.delete(`${environment.serverUrl}${this.authorApi}/${id}`);
  }

  public updateAuthor(author: Author) {
    return this.httpClient.put(
      `${environment.serverUrl}${this.authorApi}/${author.id}`,
      author
    );
  }

  public authors$(): Observable<{
    total: number;
    data: Author[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        params = params.append("name", this.pageService.page.search);
        return this.httpClient.get<{
          total: number;
          data: Author[];
        }>(`${environment.serverUrl}${this.authorApi}`, { params });
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
