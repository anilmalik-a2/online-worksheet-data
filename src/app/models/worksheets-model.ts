export class WorksheetModel {
    id: string;
    empId: string;
    empName: string;
    week: number;
    class: string;
    section: string;
    entryDate: Date;
    enroll: number;
    onlineSent: number;
    onlineReverted: number;
    hardSent: number;
    hardReverted: number;
    notContactable: number;
    migrated: number;
    unreachableNo: number;
    addressChanged: number;
    other: number;

    constructor() {
        this.id = '';
        this.empId = '';
        this.empName = '';
        this.week = 0;
        this.class = '';
        this.section = '';
        this.entryDate = undefined;
        this.enroll = 0;
        this.onlineSent = 0;
        this.onlineReverted = 0;
        this.hardSent = 0;
        this.hardReverted = 0;
        this.notContactable = 0;
        this.migrated = 0;
        this.unreachableNo = 0;
        this.addressChanged = 0;
        this.other = 0;
    }
}
