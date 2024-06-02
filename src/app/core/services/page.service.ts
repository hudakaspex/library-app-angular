import { Injectable } from "@angular/core";
import { PaginationConfig } from "../models/pagination-config";
import { BehaviorSubject, map } from "rxjs";
import { PageEvent } from "../models/page-event";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class PageService {
  private _pageSubject: BehaviorSubject<PageEvent> = new BehaviorSubject({
    pageNumber: 0,
    pageSize: PaginationConfig.pageSize,
    search: "",
  });
  
  public readonly page$ = this._pageSubject.asObservable()
    .pipe(
      map(pageEvent => {
        let params = new HttpParams();
        params = params.append("pageSize", pageEvent.pageSize);
        params = params.append("pageNumber", pageEvent.pageNumber);
        return params;
      })
    );

  public get page() {
    return this._pageSubject.value;
  }

  public updatePagination(
    pageSize = this.page.pageSize,
    pageNumber = this.page.pageNumber
  ): void {
    this._pageSubject.next({
      pageNumber,
      pageSize,
      search: this.page.search,
    });
  }

  // used when table has pagination
  public onSearch(search = this.page.search): void {
    this._pageSubject.next({
      pageNumber: this.page.pageNumber,
      pageSize: this.page.pageSize,
      search,
    });
  }
}
