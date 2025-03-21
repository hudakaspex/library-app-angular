import { LoanStatus } from "./loan-status.enum";

export class LoanHttpRequest {
  private id: number;
  private bookIds: number[];
  private memberId: number;
  private startDate: number;
  private endDate: number;
  private returnDate: number;
  private status: LoanStatus;

  public get getId() {
    return this.id;
  }

  public set setId(id: number) {
    this.id = id;
  }

  public get getBookIds() {
    return this.bookIds;
  }

  public set setBookIds(bookIds: number[]) {
    this.bookIds = bookIds;
  }

  public get getMemberId() {
    return this.memberId;
  }

  public set setMemberId(memberId: number) {
    this.memberId = memberId;
  }

  public get getStartDate() {
    const date = new Date(this.startDate);
    return date;
  }

  public set setStartDate(date: Date | number | string) {
    if (date) {
      this.startDate = new Date(date).getTime();
    }
  }

  public get getEndDate() {
    const date = new Date(this.endDate);
    return date;
  }

  public set setEndDate(date: Date | number | string) {
    if (date) {
      this.endDate = new Date(date).getTime();
    }
  }

  public get getReturnDate() {
    const date = new Date(this.returnDate);
    return date;
  }

  public set setReturnDate(date: Date | number | string) {
    if (date) {
      this.returnDate = new Date(date).getTime();
    }
  }

  public get getStatus() {
    return this.status;
  }

  public set setStatus(status: LoanStatus) {
    this.status = status;
  }
}
