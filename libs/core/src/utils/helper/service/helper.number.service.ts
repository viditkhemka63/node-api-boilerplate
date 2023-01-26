import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperNumberService {
    check(number: string): boolean {
        const regex = /^-?\d+$/;
        return regex.test(number);
    }

    create(number: string): number {
        return Number(number);
    }
}
