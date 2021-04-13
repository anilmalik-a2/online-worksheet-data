import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const rule1Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const a = control.get('enroll');
    const b = control.get('onlineSent');
    const d = control.get('hardSent');
    const f = control.get('notContactable');
    const sum = parseInt(b.value + d.value + f.value, 10);
    return !Number.isNaN(sum) && a.value !== sum ? { rule1Failed: true } : null;
};

export  const rule2Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const b = control.get('onlineSent');
    const c = control.get('onlineReverted');
    return b.value < c.value ? { rule2Failed: true } : null;
};

export const rule3Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const d = control.get('hardSent');
    const e = control.get('hardReverted');
    return d.value < e.value ? { rule3Failed: true } : null;
};

export const rule4Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const f = control.get('notContactable');
    const g = control.get('migrated');
    const h = control.get('unreachableNo');
    const i = control.get('addressChanged');
    const j = control.get('other');
    const sum = parseInt(g.value + h.value + i.value + j.value, 10);
    return !Number.isNaN(sum) && f.value !== sum ? { rule4Failed: true } : null;
};
