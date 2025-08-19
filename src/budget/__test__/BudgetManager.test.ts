import dayjs from 'dayjs';
import { Budget } from "../models/Budget";
import { BudgetService } from '../BudgetService';
import { BudgetManager } from '../BudgetManager';

describe('BudgetManager', () => {
    let budgetManager: BudgetManager;
    let mockBudgetService: BudgetService;

    beforeEach(() => {
        mockBudgetService = new BudgetService();
        mockBudgetService.getAll = jest.fn().mockReturnValue([]);
        budgetManager = new BudgetManager(mockBudgetService);
    });

    function givenBudgets(budgets: Budget[]) {
        (mockBudgetService.getAll as jest.Mock).mockReturnValue(budgets);
    }
    
    function whenQueryAmount(startDate: string, endDate: string): number {
        return budgetManager.queryTotalAmount(dayjs(startDate), dayjs(endDate));
    }
    
    function ShouldBe(actualAmount: number, expectedAmount: number) {
        expect(actualAmount).toBe(expectedAmount);
    }

    it('should return 0 when no budget is available for the period', () => {
        givenBudgets([]);
        ShouldBe(whenQueryAmount('2025-07-01', '2025-07-31'), 0);
    });

    it('should return full budget amount when querying for the entire month', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-07-01', '2025-07-31'), 3100);
    });

    it('should calculate daily budget amount when querying for a single day', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-07-11', '2025-07-11'), 100);
    });

    it('should calculate partial budget when period starts before budget month', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-06-11', '2025-07-11'), 1100);
    });

    it('should calculate partial budget when period extends beyond budget month', () => { 
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-07-30', '2025-08-14'), 200);
    });

    it('should return 0 when query period is entirely before budget month', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-06-01', '2025-06-10'), 0);
    });

    it('should return 0 when query period is entirely after budget month', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        ShouldBe(whenQueryAmount('2025-08-15', '2025-08-30'), 0);
    });

    it('should calculate total budget across multiple months when period spans multiple budgets', () => {
        givenBudgets([
            new Budget('2025-06', 30),
            new Budget('2025-07', 310),
            new Budget('2025-08', 3100)
        ]);
        ShouldBe(whenQueryAmount('2025-06-28', '2025-08-19'), 1900 + 310 + 3);
    });
});