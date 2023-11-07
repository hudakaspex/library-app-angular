import { Component, OnInit } from "@angular/core";
import { BookService } from "../../core/services/book.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  constructor(private bookService: BookService) {}

  ngOnInit() {}
}
