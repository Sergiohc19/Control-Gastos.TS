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
            <header className="bg-rose-300 py-8 max-h-72 relative">
              <h1 className="uppercase text-center font-black text-4xl text-white max-sm:text-sm max-sm:text-center pr-20 ">
                Planificiador de Gastos
              </h1>

              {/* Botones alineados a la derecha del header */}
              <div className="absolute top-8 right-8 flex flex-col gap-2 max-sm:top-3 max-sm:right-3 sm:flex-row">
                <Link
                  to="/login"
                  className="bg-pink-600 text-white py-2  px-4 rounded  max-sm:text-xs  max-sm:py-1 max-sm:px-1  max-sm:text-center hover:bg-pink-500 transition-all 
               "
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white py-2 px-4 rounded max-sm:text-xs  max-sm:py-1 max-sm:px-1 max-sm:text-center   hover:bg-pink-500 transition-all 
              "
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
