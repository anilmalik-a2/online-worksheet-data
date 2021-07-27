export class OnlineClassModel {
    id: string;
    empId: string;
    empName: string;
    week: number;
    class: string;
    section: string;
    subject: string;
    entryDate: Date;
    enroll: number;
    onlineAttended: number;
    dontHaveDevice: number;
    reachedThroughPhone: number;
    notContacted: number;

    constructor() {
        this.id = '';
        this.empId = '';
        this.empName = '';
        this.week = 0;
        this.class = '';
        this.section = '';
        this.subject = '';
        this.entryDate = undefined;
        this.enroll = 0;
        this.onlineAttended = 0;
        this.dontHaveDevice = 0;
        this.reachedThroughPhone = 0;
        this.notContacted = 0;
    }
}
