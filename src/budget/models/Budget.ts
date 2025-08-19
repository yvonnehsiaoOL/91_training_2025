import dayjs, { Dayjs } from "dayjs";
import { Period } from "./Period";
import { DATE_FORMAT, TIME_UNIT } from "./Constants";

export class Budget {

    yearMonth: string;
    amount: number;

    constructor(yearMonth: string, amount: number) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    private getDays(): number {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).daysInMonth();
    }

    private getFirstDay(): Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).startOf(TIME_UNIT.MONTH);
    }

    private getLastDay(): Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).endOf(TIME_UNIT.MONTH);
    }

    private getDailyAmount(): number {
        return this.amount / this.getDays();
    }
    
    private createPeriod(): Period {
        return new Period(this.getFirstDay(), this.getLastDay());
    }

    getOverlappingAmount(other: Period): number {
        return this.createPeriod().getOverlappingDays(other) * this.getDailyAmount();
    }
}
