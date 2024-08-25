import { LoanStatus } from "./loan-status.enum";

export class LoanFilter {
    status: LoanStatus;
    endDate: number;
    name: string;

    constructor() {
        this.status = null;
        this.endDate = null;
    }
}