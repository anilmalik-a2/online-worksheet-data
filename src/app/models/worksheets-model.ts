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
}
