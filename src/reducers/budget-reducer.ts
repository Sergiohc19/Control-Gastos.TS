// Definición de las acciones
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } };

// Definición del estado
export type BudgetState = {
    budget: number;
};

// Estado inicial
export const initialState: BudgetState = {
    budget: 0,
};

// Reducer
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
): BudgetState => {
    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget,
            };
        default:
            return state;
    }
};