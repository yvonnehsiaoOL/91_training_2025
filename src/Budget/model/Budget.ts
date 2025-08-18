import { Period } from "./Period";
import { DateComponent } from "./DateComponent";

export default class Budget {

    private amount: number;
    private yearMonth: string;

    constructor(amount: number, yearMonth: string) {
        this.amount = amount;
        this.yearMonth = yearMonth;
    }

    private getDateComponent(): DateComponent {
        const [year, month] = this.yearMonth.split("-").map(Number)
        return { year, month }
    }

    private getFirstDay(): Date {
        const { year, month } = this.getDateComponent()
        return new Date(year, month - 1, 1, 0, 0, 0, 0)
    }

    private getLastDay(): Date {
        const { year, month } = this.getDateComponent()
        return new Date(year, month, 0, 23, 59, 59, 999)
    }

    private getDays(): number {
        const diffTime = this.getLastDay().getTime() - this.getFirstDay().getTime()
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
    }

    private getDailyAmount(): number {
        const days = this.getDays()
        return this.amount / this.getDays()
    }

    private createPeriod(): Period {
        const firstDay = this.getFirstDay()
        const lastDay = this.getLastDay()
        return new Period(firstDay, lastDay);
    }

    getOverlappingAmount(period: Period): number {
        return this.getDailyAmount() * period.getOverlappingDays(this.createPeriod())
    }
};
