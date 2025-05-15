import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { saveToFirestore } from '../helpers/syncFirestone';
import { useBudget } from '../hooks/useBudget';

export const useSyncExpenses = () => {
  const [currentUser] = useAuthState(auth);
  const { state } = useBudget();

  useEffect(() => {
    if (!currentUser || state.expense.length === 0) return;

    const now = new Date();
    const monthKey = `${now.getFullYear()}_${now.getMonth()}`;

    const totalSpent = state.expense.reduce((acc, exp) => acc + exp.amount, 0);
    const remaining = state.budget - totalSpent;

    const monthlyData = {
      budget: state.budget,
      remaining,
      expenses: state.expense,
      createdAt: now,
    };

    saveToFirestore(currentUser.uid, monthKey, monthlyData);
  }, [state]);
};