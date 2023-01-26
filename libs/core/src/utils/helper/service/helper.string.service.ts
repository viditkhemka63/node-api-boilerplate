import { Injectable } from '@nestjs/common';
import { HelperDateService } from './helper.date.service';

@Injectable()
export class HelperStringService {
    constructor(private readonly helperDateService: HelperDateService) {}

    checkEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    censor(value: string): string {
        const length = value.length;
        if (length === 1) {
            return value;
        }

        const end = length > 4 ? length - 4 : 1;
        const censorString = '*'.repeat(end > 10 ? 10 : end);
        const visibleString = value.substring(end, length);
        return `${censorString}${visibleString}`;
    }

    checkStringOrNumber(text: string) {
        const regex = new RegExp(/^[\w.-]+$/);

        return regex.test(text);
    }

    convertStringToNumberOrBooleanIfPossible(
        text: string
    ): string | number | boolean {
        let convertValue: string | boolean | number = text;

        const regexNumber = /^-?\d+$/;
        if (text === 'true' || text === 'false') {
            convertValue = text === 'true';
        } else if (regexNumber.test(text)) {
            convertValue = Number(text);
        }

        return convertValue;
    }

    checkPasswordWeak(password: string, length?: number): boolean {
        const regex = new RegExp(
            `^(?=.*?[A-Z])(?=.*?[a-z]).{${length || 8},}$`
        );

        return regex.test(password);
    }

    checkPasswordMedium(password: string, length?: number): boolean {
        const regex = new RegExp(
            `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{${length || 8},}$`
        );

        return regex.test(password);
    }

    checkPasswordStrong(password: string, length?: number): boolean {
        const regex = new RegExp(
            `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${
                length || 8
            },}$`
        );

        return regex.test(password);
    }

    checkSafeString(text: string): boolean {
        const regex = new RegExp('^[A-Za-z0-9_-]+$');
        return regex.test(text);
    }
}
