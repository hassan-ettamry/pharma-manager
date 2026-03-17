import { useMedicaments } from "../hooks/useMedicaments";
import { useVentes } from "../hooks/useVentes";

export default function DashboardPage() {
  const { medicaments } = useMedicaments();
  const { ventes } = useVentes();

  const lowStock = medicaments.filter(
    (m) => m.stock_actuel <= m.stock_minimum
  );

  const today = new Date().toISOString().split("T")[0];

  const ventesToday = ventes.filter(
    (v) => v.date_vente?.startsWith(today)
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Total Medicaments: {medicaments.length}</p>
      <p>Low Stock Alerts: {lowStock.length}</p>
      <p>Sales Today: {ventesToday.length}</p>
    </div>
  );
}