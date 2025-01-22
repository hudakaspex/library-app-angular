import { Component, inject, OnInit } from "@angular/core";
import { GeneralTableComponent } from "app/shared/general-table/general-table.component";
import { MemberDialogComponent } from "../../components/member-dialog/member-dialog.component";
import { CommonModule } from "@angular/common";
import { TableColumn } from "app/shared/general-table/models/table-column.model";
import { MemberService } from "../../core/services/member.service";
import { MatDialog } from "@angular/material/dialog";
import { filter, Observable, shareReplay, switchMap } from "rxjs";
import { Utils } from "app/shared/utils";
import { Member } from "../../core/models/member.model";
import { PageService } from "app/core/services/page.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-member-page",
  templateUrl: "./member-page.component.html",
  styleUrls: ["./member-page.component.scss"],
  standalone: true,
  imports: [CommonModule, GeneralTableComponent, MemberDialogComponent],
  providers: [PageService, MemberService],
})
export class MemberPageComponent {
  private memberService = inject(MemberService);
  public data$: Observable<{ total: number; data: Member[] }>;
  private dialog = inject(MatDialog);

  public columns: TableColumn[] = [
    { label: "Name", propName: "name", type: "text" },
    { label: "Phone", propName: "phone", type: "text" },
    { label: "Address", propName: "address", type: "text" },
    { label: "Email", propName: "email", type: "text" },
    { label: "Joined", propName: "dateJoined", type: "date" },
  ];

  constructor() {
    this.initData();
  }

  private initData() {
    this.data$ = this.memberService.members$().pipe(shareReplay(1));
  }

  public onAddEvent() {
    this.dialog
      .open(MemberDialogComponent, {
        width: "700px",
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((result) => Utils.isNotEmpty(result)),
        switchMap((author) => this.memberService.create(author))
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onUpdateEvent(member: Member) {
    this.dialog
      .open(MemberDialogComponent, {
        width: "700px",
        disableClose: true,
        data: member,
      })
      .afterClosed()
      .pipe(
        filter((result) => Utils.isNotEmpty(result)),
        switchMap((updatedMember) =>
          this.memberService.update(updatedMember.id, updatedMember)
        )
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onDeleteEvent(member: Member) {
    if (confirm(`Are you sure to delete this author ${member.name}?`)) {
      this.memberService.delete(member.id).subscribe(() => {
        this.memberService.onSearch();
      });
    }
  }

  public onSearch(search: string) {
    this.memberService.onSearch(search);
  }

  public onPaginationEvent(event: PageEvent) {
    this.memberService.updatePagination(event.pageSize, event.pageIndex);
  }
}
