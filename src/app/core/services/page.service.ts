import { Injectable } from "@angular/core";
import { PaginationConfig } from "../models/pagination-config";
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable } from "rxjs";
import { PageEvent } from "../models/page-event";
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class PageService {
  private _pageSubject: BehaviorSubject<PageEvent> = new BehaviorSubject({
    pageNumber: 0,
    pageSize: PaginationConfig.pageSize,
    search: "",
  });

  public readonly page$ = this._pageSubject.asObservable();

  public readonly searchCtrl = new FormControl();
  public searchResult$: Observable<string>;

  public get page() {
    return this._pageSubject.value;
  }

  constructor() { }

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

  public initSearchCtrl() {
    this.searchResult$ = this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter(val => val.length >= 3 || val.length == 0)
      );
  }


}
