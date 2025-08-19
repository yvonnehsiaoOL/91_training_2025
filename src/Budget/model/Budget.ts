import { Period } from "./Period";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT, TIME_UNIT } from "./Constants";

export default class Budget {

    private amount: number;
    private yearMonth: string;

    constructor(amount: number, yearMonth: string) {
        this.amount = amount;
        this.yearMonth = yearMonth;
    }

    private getFirstDay(): Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).startOf(TIME_UNIT.MONTH)
    }

    private getLastDay(): Dayjs {
        return dayjs(this.yearMonth, DATE_FORMAT.YEAR_MONTH).endOf(TIME_UNIT.MONTH)
    }

    private getDays(): number {
        return this.getLastDay().diff(this.getFirstDay(), TIME_UNIT.DAY) + 1
    }

    private getDailyAmount(): number {
        return this.amount / this.getDays()
    }

    private createPeriod(): Period {
        return new Period(
            (this.getFirstDay().toDate()), 
            (this.getLastDay().toDate())
        );
    }

    getOverlappingAmount(anotherPeriod: Period): number {
        return this.getDailyAmount() * anotherPeriod.getOverlappingDays(this.createPeriod())
    }
};
