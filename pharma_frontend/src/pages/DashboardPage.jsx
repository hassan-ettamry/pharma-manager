import { useMedicaments } from "../hooks/useMedicaments";
import { useVentes } from "../hooks/useVentes";

/**
 * Dashboard page
 */
export default function DashboardPage() {
  const { medicaments } = useMedicaments();
  const { ventes } = useVentes();

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h3>Total Medicaments</h3>
        <p>{medicaments.length}</p>
      </div>

      <div>
        <h3>Total Sales</h3>
        <p>{ventes.length}</p>
      </div>
    </div>
  );
}