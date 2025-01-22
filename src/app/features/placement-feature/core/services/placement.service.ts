import { Injectable } from "@angular/core";
import { AbstractCrudService } from "app/core/services/abstractCrudService";
import { Placement } from "../models/placement.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PageService } from "app/core/services/page.service";
import { map, Observable, switchMap } from "rxjs";
import { environment } from "environments/environment";

const placementApi = "/api/placements";

@Injectable()
export class PlacementService extends AbstractCrudService<Placement> {
  protected createModel(data: Placement): Placement {
    return new Placement(data);
  }

  constructor(
    protected httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, placementApi);
  }

  public placements$(): Observable<{
    total: number;
    data: Placement[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        return this.httpClient.get<{
          total: number;
          data: Placement[];
        }>(`${environment.serverUrl}${placementApi}`, { params });
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
