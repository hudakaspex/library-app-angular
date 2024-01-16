import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PaginationService {
  private _pageSize = 10;
  private _pageSizeOptions = [5, 10, 25, 100];

  get defaultPageSize() {
    return this._pageSize;
  }

  get pageSizeOptions() {
    return this._pageSizeOptions;
  }

  constructor() {}
}
