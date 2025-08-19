import BudgetManager from "../BudgetManager";
import Budget from "../model/Budget";
import BudgetService from "../service/BudgetService";

describe('BudgetManager', () => {

    const budgetService = new BudgetService();
    const budgetManager = new BudgetManager(budgetService);

    const givenBudget = (budgets: Budget[]) => {
        jest.spyOn(budgetService, 'getAll').mockReturnValue(budgets);
    };

    const whenQueryAmount = (startDate: Date, endDate: Date): number => {
        return budgetManager.queryTotalAmount(startDate, endDate);
    };

    const shouldBe = (actual: number, expected: number) => {
        expect(actual).toBe(expected);
    };

    describe('queryTotalAmount', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('should return the total budget amount for 7/30 ~ 8/14', () => {
            givenBudget([
                new Budget(6000, '2025-06'),
                new Budget(7000, '2025-07'),
                new Budget(8000, '2025-08'),
            ]);

            const expectedAmount = Math.round((7000 / 31) * 2 + (8000 / 31) * 14);
            shouldBe(whenQueryAmount(new Date('2025-07-30'), new Date('2025-08-14')), expectedAmount);
        });

        it('should return the total budget amount for 6/30 ~ 8/14', () => {
            givenBudget([
                new Budget(6000, '2025-06'),
                new Budget(7000, '2025-07'),
                new Budget(8000, '2025-08'),
            ]);

            const expectedAmount = Math.round(((6000 / 30) * 1) + 7000 + ((8000 / 31) * 14));
            shouldBe(
                whenQueryAmount(new Date('2025-06-30'), new Date('2025-08-14')), 
                expectedAmount
            );
        }); 
    });
});