import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";


export default function BudgetTracker() {

const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

const percentage = +((totalExpenses / state.budget * 100).toFixed(2));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
     <CircularProgressbar
     value={percentage}
     styles={buildStyles({
      // Color del lo gastado
      pathColor: percentage === 100 ? "#b30000	" : " #ff9999",
      // Color del presupuesto
      trailColor: "	#e6e6e6",
      textSize: 12,
      // Color del texto % Gastado
      textColor:  percentage === 100 ? "#b30000	" : " #ff9999",
     })}
     
      text={`${percentage}% Gastado`}
     />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold uppercase rounded-lg  hover:bg-pink-500"
          onClick={() => dispatch({ type: "reset-app" })}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
