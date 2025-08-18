import { Period } from "./model/Period";
import BudgetService from "./service/BudgetService";

export default class BudgetManager {

    private budgetService: BudgetService;

    constructor() {
        this.budgetService = new BudgetService();
    }

    queryTotalAmount(start: Date, end: Date): number {
        const budgets = this.budgetService.getAll();
        const period = new Period(start, end);
        return Math.round(budgets.reduce((total, budget) => total + budget.getOverlappingAmount(period), 0));
    }
};
