export class Author {
    id: number;
    name: string;
    address: string;
    birthDate: string;
    email: string;
    phone: string;

    constructor(author?: Partial<Author>) {
        if (author) {
            this.id = author.id;
            this.name = author.name;
            this.address = author.address;
            this.birthDate = author.birthDate;
            this.email = author.email;
            this.phone = author.phone;
        }
    }
}