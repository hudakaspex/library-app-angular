import { Utils } from "app/shared/utils";

export class Member {
    public id: number;
    public name: string;
    public phone: string;
    public address: string;
    public email: string;
    public dateJoined: number;

    constructor(member?: Partial<Member>) {
        if (member) {
            this.id = member.id;
            this.name = member.name;
            this.phone = member.phone;
            this.address = member.address;
            this.email = member.email;
            this.initDateJoined(member.dateJoined);
        }
    }

    private initDateJoined(date: number | Date | string) {
        if (Utils.isNotEmpty(date)) {
            if (typeof date == 'number') {
                this.dateJoined = date;
            }
            else {
                this.setDateJoined = new Date(date);
            }
        }
    }

    public get getDateJoined() {
        const date = new Date(this.dateJoined);
        return date;
    }

    public set setDateJoined(date: Date) {
        if (date) {
            this.dateJoined = new Date(date).getTime();
        }
    }
}
