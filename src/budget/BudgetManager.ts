import { Dayjs } from "dayjs";
import { BudgetService } from "./BudgetService";
import { Period } from "./models/Period";

export class BudgetManager {

    private service: BudgetService;

    constructor(service: BudgetService) {
        this.service = service;
    }

    queryTotalAmount(startDate: Dayjs, endDate: Dayjs) {
        return this.service.getAll()
            .map(budget => budget.getOverlappingAmount(new Period(startDate, endDate)))
            .reduce((x, y) => x + y, 0);
    }
}
