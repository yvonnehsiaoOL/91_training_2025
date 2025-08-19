import dayjs from "dayjs";
import { TIME_UNIT } from "./Constants";

export class Period {
    
    private startDate: Date;
    private endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
    }

    private hasNoOverlapping(anotherPeriod: Period): boolean {
        return dayjs(anotherPeriod.endDate).isBefore(dayjs(this.startDate)) || 
               dayjs(anotherPeriod.startDate).isAfter(dayjs(this.endDate));
    }

    private isInvalid(): boolean {
        return dayjs(this.endDate).isBefore(dayjs(this.startDate));
    }

    private getOverlappingPeriod(anotherPeriod: Period): Period {
        const effectiveStart = dayjs(this.startDate).isAfter(dayjs(anotherPeriod.startDate)) 
            ? this.startDate 
            : anotherPeriod.startDate;
        const effectiveEnd = dayjs(this.endDate).isBefore(dayjs(anotherPeriod.endDate)) 
            ? this.endDate
            : anotherPeriod.endDate;
        return new Period(effectiveStart, effectiveEnd);
    }

    getOverlappingDays(anotherPeriod: Period): number {
        if (this.isInvalid() || this.hasNoOverlapping(anotherPeriod)) {
            return 0;
        }
        const overlappingPeriod = this.getOverlappingPeriod(anotherPeriod);
        return dayjs(overlappingPeriod.endDate).diff(dayjs(overlappingPeriod.startDate), TIME_UNIT.DAY) + 1;
    }
}
