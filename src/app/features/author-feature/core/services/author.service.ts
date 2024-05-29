import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageService } from "app/core/services/page.service";
import { environment } from "environments/environment";
import { Author } from "../models/author.model";
import { Observable, switchMap } from "rxjs";
import { AbstractCrudService } from "app/core/services/abstractCrudService";

const authorApi = "/api/authors"

@Injectable()
export class AuthorService extends AbstractCrudService<Author> {

  constructor(
    private httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, authorApi);
  }

  protected createModel(data: Partial<Author>): Author {
    return new Author(data);
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
        }>(`${environment.serverUrl}${authorApi}`, { params });
      })
    );
  }

  public updatePagination(
    pageSize: number,
    pageNumber: number
  ) {
    this.pageService.updatePagination(pageSize, pageNumber);
  }

  public onSearch(search = this.pageService.page.search) {
    this.pageService.onSearch(search);
  }

}
