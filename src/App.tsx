import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterBYCategory } from "./components/FilterBYCategory";
import { useSyncExpenses } from "./hooks/useSyncExpenses";
import { Link } from "react-router-dom";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useSyncExpenses(); // 🔥 Aquí se sincronizan los gastos con Firestore

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expense", JSON.stringify(state.expense));
  }, [state]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uooercase text-center font-black text-4xl text-white">
          Planificiador de Gastos
        </h1>
    {/* Botones alineados a la derecha del header */}
  <div className="absolute top-8 right-8 flex gap-2">
    <Link to="/login" className="bg-blue-900 text-white py-2 rounded hover:bg-cyan-700 px-4">
      Iniciar Sesión
    </Link>
    <Link to="/register" className="bg-blue-900 text-white py-2 rounded hover:bg-cyan-700 px-4">
      Registrarse
    </Link>
  </div>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterBYCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
