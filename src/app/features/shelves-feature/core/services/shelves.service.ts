import { Injectable } from "@angular/core";
import { AbstractCrudService } from "app/core/services/abstractCrudService";
import { Shelves } from "../models/shelves.model";
import { PageService } from "app/core/services/page.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, switchMap } from "rxjs";
import { environment } from "environments/environment";

const shelvesApi = "/api/shelves";

@Injectable()
export class ShelvesService extends AbstractCrudService<Shelves> {
  protected createModel(data: Shelves): Shelves {
    return new Shelves(data);
  }
  constructor(
    protected httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, shelvesApi);
  }

  public shelves$() {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        return this.httpClient.get<{
          total: number;
          data: Shelves[];
        }>(`${environment.serverUrl}${shelvesApi}`, { params });
      }),
      map((result) => {
        result.data = result.data.map((val) => this.createModel(val));
        return result;
      })
    );
  }

  public updatePagination(pageSize: number, pageNumber: number) {
    this.pageService.updatePagination(pageSize, pageNumber);
  }
}
