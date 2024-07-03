import { CommonModule } from '@angular/common';
import { Component, effect, model, ModelSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Book } from 'app/features/book-feature/core/models/book.model';

@Component({
  selector: 'loan-books',
  templateUrl: './loan-books.component.html',
  styleUrls: ['./loan-books.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class LoanBooksComponent {
  public books: ModelSignal<Book[]> = model([]);
  public datasource = new MatTableDataSource([]);
  public displayedColumns: string[] = ['no', 'title', 'author', 'type', 'delete'];

  constructor() {
    effect(() => {
      this.datasource.data = this.books();
    })
  }

  onDelete(id: number) {
    this.books.update(books => {
      return books.filter(book => book.id !== id);
    });
  }

}
