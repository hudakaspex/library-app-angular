import { Utils } from "app/shared/utils";

export class Author {
    id: number;
    name: string;
    address: string;
    birthdate: number; // in milliseconds unix epoc
    email: string;
    phone: string;

    constructor(author?: Partial<Author>) {
        if (author) {
            this.id = author.id;
            this.name = author.name;
            this.address = author.address;
            this.email = author.email;
            this.phone = author.phone;
            this.initBirthdate(author.birthdate);
        }
    }

    private initBirthdate(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.birthdate = date;
            }
            else {
                this.setBirthdate = new Date(date);
            }
        }
    }

    public get birthdateInDate() {
        const date = new Date(this.birthdate);
        return date;
    }

    public set setBirthdate(date: Date) {
        if (date) {
            this.birthdate = new Date(date).getTime();
        }
    }

}