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
    keyword: "",
  });

  public readonly page$ = this._pageSubject.asObservable().pipe(
    map((pageEvent) => {
      let params = new HttpParams();
      const propParams = Object.keys(pageEvent);
      propParams.forEach((prop) => {
        params = params.append(prop, pageEvent[prop]);
      });
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
      keyword: this.page.keyword,
    });
  }

  // used when table has pagination
  public onSearch(keyword = this.page.keyword): void {
    this._pageSubject.next({
      pageNumber: this.page.pageNumber,
      pageSize: this.page.pageSize,
      keyword,
    });
  }

  public onFilter(filter = {}) {
    this._pageSubject.next({
      ...this.page,
      ...filter,
    });
  }
}
