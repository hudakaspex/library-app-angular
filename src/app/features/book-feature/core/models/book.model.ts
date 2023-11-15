import { BookType } from "./book-type.enum";

export class Book {
    id: number;
    title: string;
    author: string;
    publicationDate: Date;
    isbn: string;
    type: BookType;

    constructor(book?: Book) {
        if (book) {
            this.id = book.id;
            this.title = book.title;
            this.author = book.author;
            this.publicationDate = new Date(book.publicationDate);
            this.isbn = book.isbn;
            this.type = book.type;
        }
    }
}