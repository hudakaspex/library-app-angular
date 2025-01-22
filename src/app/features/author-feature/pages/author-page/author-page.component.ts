import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';
import { AuthorService } from '../../core/services/author.service';
import { Author } from '../../core/models/author.model';
import { filter, Observable, shareReplay, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../../components/author-dialog/author-dialog.component';
import { Utils } from 'app/shared/utils';
import { PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageService } from 'app/core/services/page.service';

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
    AuthorService,
    PageService
  ]
})
export class AuthorPageComponent {
  private authorService: AuthorService = inject(AuthorService);
  private dialog = inject(MatDialog);
  public columns: TableColumn[] = [
    { label: 'Name', propName: 'name', type: 'text' },
    { label: 'Email', propName: 'email', type: 'text' },
    { label: 'Address', propName: 'address', type: 'text' },
    { label: 'Phone', propName: 'phone', type: 'text' },
    { label: 'Birthdate', propName: 'birthdate', type: 'date' },
  ];
  public data$: Observable<{ data: Author[], total: number }>;

  constructor() {
    this.initAuthor();
  }

  /**
   * Initializes the author data stream by subscribing to the authors$ observable
   * from the authorService and sharing the latest emitted value with multiple subscribers.
   * The data stream is shared and replayed to ensure that all subscribers receive the same
   * emitted value.
   *
   * @private
   */
  private initAuthor() {
    this.data$ = this.authorService.authors$()
    .pipe(shareReplay(1));
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
      .subscribe(() => {
        this.initAuthor();
      });
  }

  public onUpdateEvent(author: Author) {
    this.dialog.open(AuthorDialogComponent, {
      width: "700px",
      disableClose: true,
      data: author
    })
      .afterClosed()
      .pipe(
        filter(author => Utils.isNotEmpty(author)),
        switchMap(author => this.authorService.update(author.id, author))
      )
      .subscribe(() => {
        this.initAuthor();
      });
  }

  public onDeleteEvent(author: Author) {
    if (confirm(`Are you sure to delete this author ${author.name}?`)) {
      this.authorService.delete(author.id).subscribe(() => {
        this.authorService.onSearch();
      });
    }
  }

  public onSearch(search: string) {
    this.authorService.onSearch(search);
  }

  public onPaginationEvent(event: PageEvent) {
    this.authorService.updatePagination(event.pageSize, event.pageIndex);
  }
}
