import { Dayjs } from "dayjs";
import { TIME_UNIT } from "./Constants";

export class Period {
    
    private readonly start: Dayjs;
    private readonly end: Dayjs;

    constructor(start: Dayjs, end: Dayjs) {
        this.start = start;
        this.end = end;
    }

    private hasNoOverlapping(other: Period): boolean {
        return this.start.isAfter(other.end) || this.end.isBefore(other.start);
    }

    private isInvalid(): boolean {
        return this.end.isBefore(this.start);
    }

    private getDays(): number {
        return this.end.diff(this.start, TIME_UNIT.DAY) + 1;
    }

    getOverlappingDays(other: Period): number {
        if (this.isInvalid() || this.hasNoOverlapping(other) ) {
            return 0
        }
        const effectiveStartDate = this.start.isAfter(other.start) ? this.start : other.start
        const effectiveEndDate = this.end.isBefore(other.end) ? this.end : other.end
        return new Period(effectiveStartDate, effectiveEndDate).getDays();
    }
}
