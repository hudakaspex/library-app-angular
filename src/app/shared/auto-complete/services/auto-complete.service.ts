import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AutoCompleteType } from "../models/auto-complete-type.enum";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class AutoCompleteService {
  private httpClient = inject(HttpClient);
  private bookApi = "/api/books/autocomplete";
  private bookNotInPlacementApi = "/api/books/autocomplete/notInPlacement";

  public getOptionByType(
    type: AutoCompleteType,
    query: string
  ): Observable<{ key: number; label: string }[]> {
    let params = new HttpParams();
    params = params.append("query", query);
    switch (type) {
      case AutoCompleteType.BOOK:
        return this.httpClient.get<any[]>(
          `${environment.serverUrl}${this.bookApi}`,
          { params }
        );
      case AutoCompleteType.BOOK_NOT_IN_PLACEMENT:
        return this.httpClient.get<any[]>(
          `${environment.serverUrl}${this.bookNotInPlacementApi}`,
          { params }
        );
    }
  }
}
