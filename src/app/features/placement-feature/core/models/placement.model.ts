import { Book } from "app/features/book-feature/core/models/book.model";
import { Shelves } from "app/features/shelves-feature/core/models/shelves.model";

export class Placement {
  public id: number;
  public book: Book;
  public level: number;
  public section: number;
  public shelves: Shelves;

  constructor(placement?: Placement) {
    if (placement) {
      this.id = placement.id;
      this.book = placement.book;
      this.shelves = placement.shelves;
      this.level = placement.level;
      this.section = placement.section;
    }
  }
}
