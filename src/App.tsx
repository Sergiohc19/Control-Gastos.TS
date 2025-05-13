import { useEffect, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Asegúrate de tener esto importado
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterBYCategory } from "./components/FilterBYCategory";
import { useSyncExpenses } from "./hooks/useSyncExpenses";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Registrer";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useSyncExpenses();

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expense", JSON.stringify(state.expense));
  }, [state]);

  return (
    <Routes>
      {/* Ruta principal */}
      <Route
        path="/"
        element={
          <>
            <header className="bg-blue-600 py-8 max-h-72 relative">
              <h1 className="uppercase text-center font-black text-4xl text-white">
                Planificiador de Gastos
              </h1>

              {/* Botones alineados a la derecha del header */}
              <div className="absolute top-8 right-8 flex gap-2">
                <Link
                  to="/login"
                  className="bg-blue-900 text-white py-2 rounded hover:bg-cyan-700 px-4"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-900 text-white py-2 rounded hover:bg-cyan-700 px-4"
                >
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
        }
      />

      {/* Ruta de Login */}
      <Route path="/login" element={<LoginForm />} />

      {/* Ruta de Registro */}
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;