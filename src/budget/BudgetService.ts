import dayjs from "dayjs";

export class BudgetService {
    constructor() {
    }

    getAll(): Budget[] {
        return [];
    }
}

export class Budget {
    yearMonth: string;
    amount: number;

    constructor(yearMonth: string, amount: number) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    getDaysInMonth(): number {
        return dayjs(this.yearMonth, 'YYYYMM').daysInMonth();
    }

    getDailyAmount(): number {
        return this.amount / this.getDaysInMonth();
    }

    getFirstDate(): dayjs.Dayjs {
        return dayjs(this.yearMonth, 'YYYYMM').startOf('month');
    }

    getLastDate(): dayjs.Dayjs {
        return dayjs(this.yearMonth, 'YYYYMM').endOf('month');
    }
}