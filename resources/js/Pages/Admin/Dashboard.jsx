import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard({ stats }) {
    const chartData = {
        labels: stats.evenements_recents.map(e => e.titre),
        datasets: [{
            label: 'Inscriptions',
            data: stats.evenements_recents.map(e => e.inscriptions_count),
            backgroundColor: 'rgba(220, 38, 38, 0.7)',
        }]
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Événements</p>
                    <p className="text-3xl font-bold">{stats.total_evenements}</p>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Confirmées</p>
                    <p className="text-3xl font-bold">{stats.total_inscriptions}</p>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">En attente</p>
                    <p className="text-3xl font-bold">{stats.en_attente}</p>
                </div>
            </div>
            <Bar data={chartData} />
            <a href="/admin/export-csv" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded">
                Exporter CSV
            </a>
        </div>
    );
}