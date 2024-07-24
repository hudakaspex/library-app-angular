import { inject, Injectable } from '@angular/core';
import { AbstractCrudService } from 'app/core/services/abstractCrudService';
import { Loan } from '../models/loan.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageService } from 'app/core/services/page.service';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from 'environments/environment';
import { MemberService } from 'app/features/member-feature/core/services/member.service';
import { Member } from 'app/features/member-feature/core/models/member.model';
import { LoanStatus } from '../models/loan-status.enum';

const loanApi = "/api/loans";
const statusApi = "/api/loans/updateStatus";

@Injectable()
export class LoanService extends AbstractCrudService<Loan> {
  private memberService = inject(MemberService);

  constructor(
    protected httpClient: HttpClient,
    private pageService: PageService
  ) {
    super(httpClient, loanApi)
  }

  protected createModel(data: Loan): Loan {
    return new Loan(data);
  }

  public loan$(): Observable<{
    total: number;
    data: Loan[];
  }> {
    return this.pageService.page$.pipe(
      switchMap((params: HttpParams) => {
        params = params.append("name", this.pageService.page.search);
        return this.httpClient.get<{
          total: number;
          data: Loan[];
        }>(`${environment.serverUrl}${loanApi}/search`, { params });
      }),
      map(result => {
        result.data = result.data.map(val => this.createModel(val));
        return result;
      })
    );
  }

  public updateStatus(id: number, status: LoanStatus): Observable<any> {
    return this.httpClient.post(`${environment.serverUrl}${statusApi}`, {
      id: id,
      status: status
    });
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

  public getMembers(): Observable<Member[]> {
    return this.memberService.getAll();
  }

}
