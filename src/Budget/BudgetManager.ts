import { Period } from "./model/Period";
import BudgetService from "./service/BudgetService";

export default class BudgetManager {

    private budgetService: BudgetService;

    constructor(service: BudgetService) {
        this.budgetService = service;
    }

    queryTotalAmount(start: Date, end: Date): number {
        const period = new Period(start, end);
        return Math.round(
            (this.budgetService.getAll())
            .reduce((total, budget) => total + budget.getOverlappingAmount(period), 0)
        );
    }
};
