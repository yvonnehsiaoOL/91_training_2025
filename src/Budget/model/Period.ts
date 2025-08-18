import Budget from "./Budget";

interface MonthInfo {
    year: number;
    month: number;
    isPartial: boolean;
    startDay: number;
    endDay: number;
}

export class Period {
    private startDate: Date;
    private endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    getOverlappingDays(anotherPeriod: Period): number {
        if (anotherPeriod.endDate < this.startDate || anotherPeriod.startDate > this.endDate) {
            return 0;
        }
        const effectiveStart = this.startDate.getTime() > anotherPeriod.startDate.getTime() ? this.startDate : anotherPeriod.startDate;
        const effectiveEnd = this.endDate.getTime() < anotherPeriod.endDate.getTime() ? this.endDate : anotherPeriod.endDate;
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        return Math.floor((effectiveEnd.getTime() - effectiveStart.getTime()) / millisecondsPerDay) + 1;
    }
}
