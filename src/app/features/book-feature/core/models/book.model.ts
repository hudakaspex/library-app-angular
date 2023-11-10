import { BookType } from "./book-type.enum";

export class Book {
    title: string;
    author: string;
    publicationDate: Date;
    isbn: string;
    type: BookType;
}