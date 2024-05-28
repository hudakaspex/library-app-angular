import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';
import { AuthorService } from '../../core/services/author.service';
import { Author } from '../../core/models/author.model';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../../components/author-dialog/author-dialog.component';
import { Utils } from 'app/shared/utils';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralTableComponent,
    AuthorDialogComponent
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorPageComponent implements OnInit {
  private authorService: AuthorService = inject(AuthorService);
  private dialog = inject(MatDialog);

  public columns: TableColumn[] = [
    { label: 'Name', propName: 'name', type: 'text' },
    { label: 'Email', propName: 'email', type: 'text' },
    { label: 'Address', propName: 'address', type: 'text' },
    { label: 'Phone', propName: 'phone', type: 'text' },
  ];
  public authors$: Observable<Author[]>;
  public totalData$: Observable<number>;

  constructor() {
  }

  ngOnInit() {
    this.initAuthor();
  }

  private initAuthor() {
    const authorData$ = this.authorService.authors$().pipe(shareReplay(1));
    this.authors$ = authorData$.pipe(map(res => res.data));
    this.totalData$ = authorData$.pipe(map(res => res.total));
  }

  public onAddEvent() {
    this.dialog.open(AuthorDialogComponent, {
      width: "700px",
      disableClose: true,
    })
    .afterClosed()
    .pipe(
      filter(author => Utils.isNotEmpty(author)),
      switchMap(author => this.authorService.create(author))
    )
    .subscribe(author => {
      this.initAuthor();
    });
  }

  public onUpdateEvent(author: Author) {
  }

  public onDeleteEvent() {
  }

  public onPaginationEvent() {
  }
}
