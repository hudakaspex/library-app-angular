import { Injectable } from "@angular/core";
import { PaginationConfig } from "../models/pagination-config";
import { BehaviorSubject } from "rxjs";
import { PageEvent } from "../models/page-event";

@Injectable()
export class PageService {
  private _pageSubject: BehaviorSubject<PageEvent> = new BehaviorSubject({
    pageNumber: 0,
    pageSize: PaginationConfig.pageSize,
    search: "",
  });

  public readonly page$ = this._pageSubject.asObservable();

  public get page() {
    return this._pageSubject.value;
  }

  constructor() {}

  public updatePagination(
    pageSize = this._pageSubject.value.pageSize,
    pageNumber = this._pageSubject.value.pageNumber
  ): void {
    this._pageSubject.next({
      pageNumber,
      pageSize,
      search: this._pageSubject.value.search,
    });
  }

  public updateSearch(search = this._pageSubject.value.search): void {
    this._pageSubject.next({
      pageNumber: this._pageSubject.value.pageNumber,
      pageSize: this._pageSubject.value.pageSize,
      search,
    });
  }
}
