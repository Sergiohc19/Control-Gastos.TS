import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
   return  isNaN(budget) || budget <= 0;
  }, [budget]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) return;
    dispatch({ type: "add-budget", payload: {budget}});
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="budget"
          className="text-5xl pb-2 text-pink-600 font-bold text-center max-sm:text-xl"
        >
          Definir Presupuesto
        </label>
        <input
          id="budgetID"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Añade cantidad"
          name="budget"
          value={budget}
          onChange={handleChange}
        ></input>
      </div>

      <input
        type="submit"
        value="Añadir presupuesto"
        className="bg-rose-300  hover:bg-rose-400  cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40 "
        disabled={isValid}
      />
    </form>
  );
}
