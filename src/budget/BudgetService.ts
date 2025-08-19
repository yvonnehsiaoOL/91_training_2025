import { Budget } from "./models/Budget";

export class BudgetService {
    
    getAll(): Budget[] {
        return [
            new Budget('2025-07', 3100),
        ];
    }
}