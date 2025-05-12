import { v4 as uuidv4 } from 'uuid';
import { Category, DraftExpense, Expense } from "../types";

// Definición de las acciones
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { id: Expense['id'] } } |
    { type: 'edit-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'set-expense', payload: { expense: Expense[] } } |
    { type: 'add-filter-category', payload: { id: Category['id'] } };
 


// Definición del estado
export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
};


const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;

};

const localStorageExpense = (): Expense[] => {
    const localStorageExpense = localStorage.getItem('expense');
    return localStorageExpense ? JSON.parse(localStorageExpense) : [];


};

// Estado inicial
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expense: localStorageExpense(),
    editingId: '',
    currentCategory: ''
};


const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }

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
            modal: false,
            editingId: ''
        }
    }

    if (action.type === "add-expense") {

        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false
        }


    }


    if (action.type === "delete-expense") {


        return {
            ...state,
            expense: [...state.expense.filter(expense => expense.id !== action.payload.id)],
            modal: false
        }
    }



    if (action.type === "update-expense") {


        return {
            ...state,
            editingId: action.payload.id,
            modal: true


        }
    }


    if (action.type === "edit-expense") {


        return {
            ...state,
            expense: state.expense.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''



        }
    }

    if (action.type === "reset-app") {


        return {
           ...state,
            budget: 0,
            expense: [],
        }
    }

 
       if (action.type === "add-filter-category") {
        return {
           ...state,
           currentCategory: action.payload.id
        }
    }


    return state;

};