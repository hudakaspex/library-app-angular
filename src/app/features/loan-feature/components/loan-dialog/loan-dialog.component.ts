import {
  Component,
  inject,
  Inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { DialogComponent } from "app/shared/dialog/dialog.component";
import { GenericFormComponent } from "app/shared/generic-form/generic-form.component";
import { Loan } from "../../core/models/loan.model";
import { FieldConfig } from "app/shared/generic-form/models/field-config.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LoanService } from "../../core/services/loan.service";
import { map } from "rxjs";
import { Member } from "app/features/member-feature/core/models/member.model";
import { AutoCompleteComponent } from "app/shared/auto-complete/auto-complete.component";
import { AutoCompleteType } from "app/shared/auto-complete/models/auto-complete-type.enum";
import { BookService } from "app/features/book-feature/core/services/book.service";
import { LoanBooksComponent } from "../loan-books/loan-books.component";
import { LoanHttpRequest } from "../../core/models/loan-http-request.model";

@Component({
  selector: "app-loan-dialog",
  templateUrl: "./loan-dialog.component.html",
  styleUrls: ["./loan-dialog.component.scss"],
  standalone: true,
  imports: [
    DialogComponent,
    GenericFormComponent,
    AutoCompleteComponent,
    LoanBooksComponent,
  ],
  providers: [BookService],
})
export class LoanDialogComponent {
  private loanService = inject(LoanService);
  private bookService = inject(BookService);
  public loan: WritableSignal<Loan>;
  public formConfig: FieldConfig[] = [];
  public isFormValid = signal(false);
  public autoCompleteType = AutoCompleteType.BOOK;
  public books = signal([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Loan,
    private dialogRef: MatDialogRef<LoanDialogComponent>
  ) {
    const loan = this.data ? this.data : new Loan();
    this.loan = signal(loan);
    this.initBooks();
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: "date",
        label: "Start Date",
        name: "startDate",
        value: this.loan().getStartDate,
      },
      {
        type: "date",
        label: "End Date",
        name: "endDate",
        value: this.loan().getEndDate,
      },
      {
        type: "select",
        label: "Member",
        name: "member",
        asyncOptions: this.loanService.getMembers().pipe(
          map((members) =>
            members.map((member) => {
              return { label: member.name, value: member.id };
            })
          )
        ),
        value: this.loan()?.member?.id,
      },
    ];
  }

  private initBooks() {
    let books = this.loan()?.books ? this.loan()?.books : [];
    this.books.set(books);
  }

  public onSelectBook(book: { key: number; label: string }): void {
    this.bookService.getById(book.key).subscribe((book) => {
      this.books.update((books) => {
        let index = books.findIndex((val) => val.key === book.id);
        if (index == -1) {
          books = [...books, book];
        }
        return books;
      });
    });
  }

  public onFormChange(formValue: {
    startDate: string;
    endDate: string;
    member: number;
  }) {
    if (formValue) {
      this.loan.update((loan) => {
        loan.startDate = formValue.startDate
          ? new Date(formValue.startDate).getTime()
          : null;
        loan.endDate = formValue.endDate
          ? new Date(formValue.endDate).getTime()
          : null;
        loan.member.id = formValue.member;
        return loan;
      });
    }
  }

  public onSave() {
    const loan = this.createLoanRequest();
    this.dialogRef.close(loan);
  }

  private createLoanRequest() {
    let loanReq = new LoanHttpRequest();
    loanReq.setId = this.loan().id;
    loanReq.setStartDate = this.loan().startDate;
    loanReq.setEndDate = this.loan().endDate;
    loanReq.setMemberId = this.loan().member.id;
    loanReq.setBookIds = this.books().map((book) => book.id);
    loanReq.setStatus = this.loan().status;
    return loanReq;
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
