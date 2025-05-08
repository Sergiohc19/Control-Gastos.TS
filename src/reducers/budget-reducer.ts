// Definición de las acciones
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } }  |
    { type: 'show-modal' }  |
    { type: 'close-modal' } ;

// Definición del estado
export type BudgetState = {
    budget: number
    modal: boolean
};

// Estado inicial
export const initialState: BudgetState = {
    budget: 0,
    modal: false
};

// Reducer
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget,
        };

    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }
  
    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false
        }
    }
    return state;

};