import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from "../types";

// Definición de las acciones
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { id: Expense['id'] } } |
    { type: 'edit-expense', payload: { expense: Expense } };





// Definición del estado
export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
};

// Estado inicial
export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expense: [],
    editingId: ''
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

    return state;

};