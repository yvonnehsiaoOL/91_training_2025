import BudgetManager from "../BudgetManager";
import Budget from "../model/Budget";
import { Period } from "../model/Period";

describe('BudgetManager', () => {
    let budgetManager: BudgetManager;

    beforeEach(() => {
        budgetManager = new BudgetManager();
    });

    describe('queryTotalAmount', () => {

        beforeEach(() => {
            // Mocking the BudgetService to return a fixed set of budgets
            jest.spyOn(budgetManager['budgetService'], 'getAll').mockReturnValue([
                new Budget(6000, '2025-06'),
                new Budget(7000, '2025-07'),
                new Budget(8000, '2025-08'),
            ]);
        })

        it('should return the total budget amount for 7/30 ~ 8/14', () => {
            const startDate = new Date('2025-07-30');
            const endDate = new Date('2025-08-14');
            const expectedAmount = Math.round((7000 / 31) * 2 + (8000 / 31) * 14)
            const actualAmount = budgetManager.queryTotalAmount(startDate, endDate);
            expect(actualAmount).toBe(expectedAmount);
        });

        it('should return the total budget amount for 6/30 ~ 8/14', () => {
            const startDate = new Date('2025-06-30');
            const endDate = new Date('2025-08-14');
            const expectedAmount = Math.round(((6000 / 30) * 1) + 7000 + ((8000 / 31) * 14))
            const actualAmount = budgetManager.queryTotalAmount(startDate, endDate);
            expect(actualAmount).toBe(expectedAmount);
        }); 
    });
});