import Budget from "../model/Budget";

export default class BudgetService {

    getAll(): Budget[] {
        return [new Budget(1000, "2023-10"), new Budget(2000, "2023-11")];
    }
};
