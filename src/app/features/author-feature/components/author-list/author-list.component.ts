import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {
  columns: TableColumn[] = [
    { label: 'Name', propName: 'name', type: 'text' },
    { label: 'Email', propName: 'email', type: 'text' },
    { label: 'Address', propName: 'address', type: 'text' },
    { label: 'Phone', propName: 'phone', type: 'text' },
  ];

  data = [];

  constructor() { }

  ngOnInit() {
  }

}
