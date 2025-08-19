import dayjs from "dayjs";
import { BudgetService } from "./BudgetService";
import { Period } from "./models/Period";

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
            const overlappingPeriod = new Period(startDate, endDate).getOverlappingPeriod(budget.createPeriod());
            if (overlappingPeriod === null) {
                return total;
            }
            return total + (budget.getDailyAmount() * overlappingPeriod.getDays());
        }, 0);
    }
}
