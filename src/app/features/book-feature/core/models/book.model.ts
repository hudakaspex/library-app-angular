import { Utils } from "app/shared/utils";
import { BookType } from "./book-type.enum";
import { Author } from "app/features/author-feature/core/models/author.model";

export class Book {
    id: number;
    title: string;
    author: Author;
    publicationDate: number;
    isbn: string;
    type: BookType;

    constructor(book?: Partial<Book>) {
        if (book) {
            this.id = book.id;
            this.title = book.title;
            this.author = book.author;
            this.isbn = book.isbn;
            this.type = book.type;
            this.initPublicationDate(book.publicationDate);
        }
    }

    private initPublicationDate(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.publicationDate = date;
            }
            else {
                this.setPublicationDate = new Date(date);
            }
        }
    }

    public get publicationInDate() {
        const date = new Date(this.publicationDate);
        return date;
    }

    public set setPublicationDate(date: Date) {
        if (date) {
            this.publicationDate = new Date(date).getTime();
        }
    }
}