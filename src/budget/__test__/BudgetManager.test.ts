import dayjs from 'dayjs';
import { BudgetManager } from '../BudgetManager';
import { BudgetService, Budget } from '../BudgetService';

describe('BudgetManager', () => {
    let budgetManager: BudgetManager;
    let mockBudgetService: BudgetService;

    beforeEach(() => {
        mockBudgetService = new BudgetService();
        // Mock the getAll method
        mockBudgetService.getAll = jest.fn().mockReturnValue([]);
        budgetManager = new BudgetManager(mockBudgetService);
    });

    function givenBudgets(budgets: Budget[]) {
        (mockBudgetService.getAll as jest.Mock).mockReturnValue(budgets);
    }

    it('no budget', () => {
        givenBudgets([]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-07-01'), dayjs('2025-07-31'))).toBe(0);
    });

    it('whole month', () => {
        const budget = new Budget('2025-07', 3100);
        givenBudgets([budget]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-07-01'), dayjs('2025-07-31'))).toBe(3100);
    });

    it('single date', () => {
        const budget = new Budget('2025-07', 3100);
        givenBudgets([budget]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-07-11'), dayjs('2025-07-11'))).toBe(100);
    });

    it('before overlapping', () => {
        const budget = new Budget('2025-07', 3100);
        givenBudgets([budget]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-06-11'), dayjs('2025-07-11'))).toBe(1100);
    });

    it('after overlapping', () => { 
        const budget = new Budget('2025-07', 3100);
        givenBudgets([budget]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-07-30'), dayjs('2025-08-14'))).toBe(200);
    });

    it('period before budget no overlapping', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-06-01'), dayjs('2025-06-10'))).toBe(0);
    });

    it('period after budget no overlapping', () => {
        givenBudgets([(new Budget('2025-07', 3100))]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-08-15'), dayjs('2025-08-30'))).toBe(0);
    });

    it('period in budget', () => {
        givenBudgets([
            new Budget('2025-06', 30),
            new Budget('2025-07', 310),
            new Budget('2025-08', 3100)
        ]);
        expect(budgetManager.queryTotalAmount(dayjs('2025-06-28'), dayjs('2025-08-19'))).toBe(1900 + 310 + 3);
    });
});