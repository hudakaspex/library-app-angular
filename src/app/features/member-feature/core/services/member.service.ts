import { Injectable } from '@angular/core';
import { AbstractCrudService } from 'app/core/services/abstractCrudService';
import { Member } from '../models/member.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { PageService } from 'app/core/services/page.service';
import { environment } from 'environments/environment';

const memberApi = "/api/members";

@Injectable()
export class MemberService extends AbstractCrudService<Member> {

  constructor(
    protected httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, memberApi);
  }

  protected createModel(data: Member): Member {
    return new Member(data);
  }

  public members$(): Observable<{
    total: number;
    data: Member[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        params = params.append("name", this.pageService.page.search);
        return this.httpClient.get<{
          total: number;
          data: Member[];
        }>(`${environment.serverUrl}${memberApi}/search`, { params });
      }),
      map(result => {
        result.data = result.data.map(val => this.createModel(val));
        return result;
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
