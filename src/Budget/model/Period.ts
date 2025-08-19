import { MILLISECONDS_PER_DAY } from "./Constants";

export class Period {
    private startDate: Date;
    private endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    private hasNoOverlapping(anotherPeriod: Period): boolean {
        return anotherPeriod.endDate < this.startDate || anotherPeriod.startDate > this.endDate;
    }

    private isInvalid(): boolean {
        return this.endDate < this.startDate;
    }

    private getOverlappingPeriod(anotherPeriod: Period): Period {
        const effectiveStart = this.startDate.getTime() > anotherPeriod.startDate.getTime() ? this.startDate : anotherPeriod.startDate;
        const effectiveEnd = this.endDate.getTime() < anotherPeriod.endDate.getTime() ? this.endDate : anotherPeriod.endDate;
        return new Period(effectiveStart, effectiveEnd);
    }

    getOverlappingDays(anotherPeriod: Period): number {
        if (this.isInvalid() || this.hasNoOverlapping(anotherPeriod)) {
            return 0;
        }
        const overlappingPeriod = this.getOverlappingPeriod(anotherPeriod);
        return Math.floor((overlappingPeriod.endDate.getTime() - overlappingPeriod.startDate.getTime()) / MILLISECONDS_PER_DAY) + 1;
    }
}
