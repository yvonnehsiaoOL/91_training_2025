import dayjs from "dayjs";
import { Period } from "./Period";
import { DATE_FORMAT, TIME_UNIT } from "./Constants";

export class Budget {
    yearMonth: string;
    amount: number;

    constructor(yearMonth: string, amount: number) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    private getDaysInMonth(): number {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).daysInMonth();
    }

    private getFirstDay(): dayjs.Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).startOf(TIME_UNIT.MONTH);
    }

    private getLastDay(): dayjs.Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).endOf(TIME_UNIT.MONTH);
    }

    getDailyAmount(): number {
        return this.amount / this.getDaysInMonth();
    }
    
    createPeriod(): Period {
        return new Period(this.getFirstDay(), this.getLastDay());
    }
}
