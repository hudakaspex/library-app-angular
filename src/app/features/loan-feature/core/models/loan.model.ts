import { Book } from "app/features/book-feature/core/models/book.model";
import { LoanStatus } from "./loan-status.enum";
import { Member } from "app/features/member-feature/core/models/member.model";
import { Utils } from "app/shared/utils";

export class Loan {
    public id: number;
    public startDate: number;
    public endDate: number;
    public books: Book[];
    public loanStatus: LoanStatus;
    public returnDate: number;
    public member: Member;

    constructor(loan?: Partial<Loan>) {
        if (loan) {
            this.id = loan.id;
            this.books = loan.books;
            this.loanStatus = loan.loanStatus;
            this.member = loan.member;
            this.initReturnDate(loan.returnDate);
            this.initStartDate(loan.startDate);
            this.initEndDate(loan.endDate);
        }
    }

    private initReturnDate(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.returnDate = date;
            }
            else {
                this.setEndDate = new Date(date);
            }
        }
    }

    public get getReturnDate() {
        const date = new Date(this.returnDate);
        return date;
    }

    public set setReturnDate(date: Date) {
        if (date) {
            this.returnDate = new Date(date).getTime();
        }
    }

    private initEndDate(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.endDate = date;
            }
            else {
                this.setEndDate = new Date(date);
            }
        }
    }

    public get getEndDate() {
        const date = new Date(this.endDate);
        return date;
    }

    public set setEndDate(date: Date) {
        if (date) {
            this.endDate = new Date(date).getTime();
        }
    }

    private initStartDate(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.startDate = date;
            }
            else {
                this.setStartDate = new Date(date);
            }
        }
    }

    public get getStartDate() {
        const date = new Date(this.startDate);
        return date;
    }

    public set setStartDate(date: Date) {
        if (date) {
            this.startDate = new Date(date).getTime();
        }
    }
}