import dayjs from "dayjs";
import { BudgetService, Budget } from "./BudgetService";

export class BudgetManager {

    private service: BudgetService;
    
    constructor(service: BudgetService) {
        this.service = service;
    }

    queryTotalAmount(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
        const budgets = this.service.getAll();
        if (budgets.length === 0) {
            return 0;
        }
        return budgets.reduce((total, budget) => {
            if (startDate.isAfter(budget.getLastDate()) || endDate.isBefore(budget.getFirstDate())) {
                return total;
            }
            const effectiveStartDate = startDate.isAfter(budget.getFirstDate()) ? startDate : budget.getFirstDate();
            const effectiveEndDate = endDate.isBefore(budget.getLastDate()) ? endDate : budget.getLastDate();
            const overlapDays = effectiveEndDate.diff(effectiveStartDate, 'day') + 1;
            return total + budget.getDailyAmount() * overlapDays;
        }, 0);
    }
}