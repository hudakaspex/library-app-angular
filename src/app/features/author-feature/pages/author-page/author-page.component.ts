import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';
import { AuthorService } from '../../core/services/author.service';
import { Author } from '../../core/models/author.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralTableComponent
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorPageComponent implements OnInit {
  private authorService: AuthorService = Inject(AuthorService);
  
  public columns: TableColumn[] = [
    { label: 'Name', propName: 'name', type: 'text' },
    { label: 'Email', propName: 'email', type: 'text' },
    { label: 'Address', propName: 'address', type: 'text' },
    { label: 'Phone', propName: 'phone', type: 'text' },
  ];
  public authors$: Observable<Author[]>;

  constructor() { }

  ngOnInit() {
  }

}
