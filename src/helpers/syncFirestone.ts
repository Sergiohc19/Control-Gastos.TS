import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Expense } from '../types'; // Define tu tipo de gasto

export type MonthlyData = {
  budget: number;
  remaining: number;
  expenses: Expense[];
  createdAt: Date;
};

export const saveToFirestore = async (
  userId: string,
  monthKey: string,
  data: MonthlyData
) => {
  try {
    const userDocRef = doc(db, 'users', userId, 'expensesByMonth', monthKey);
    await setDoc(userDocRef, {
      ...data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error al guardar en Firestore:', error);
  }
};