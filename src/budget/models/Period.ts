import dayjs from "dayjs";
import { TIME_UNIT } from "./Constants";

export class Period {
    
    private startDate: dayjs.Dayjs;
    private endDate: dayjs.Dayjs;

    constructor(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    private hasOverlapping(other: Period): boolean {
        return !this.startDate.isAfter(other.getEndDate()) && !this.endDate.isBefore(other.getStartDate());
    }

    private getStartDate(): dayjs.Dayjs {
        return this.startDate;
    }

    private getEndDate(): dayjs.Dayjs {
        return this.endDate;
    }

    getDays(): number {
        return this.endDate.diff(this.startDate, TIME_UNIT.DAY) + 1;
    }

    getOverlappingPeriod(other: Period): Period | null {
        const hasOverlapping = this.hasOverlapping(other);
        if (!hasOverlapping) {
            return null;
        }
        const effectiveStartDate = this.startDate.isAfter(other.getStartDate()) 
            ? this.startDate 
            : other.getStartDate();
            
        const effectiveEndDate = this.endDate.isBefore(other.getEndDate()) 
            ? this.endDate 
            : other.getEndDate();

        return new Period(effectiveStartDate, effectiveEndDate);
    }
}
