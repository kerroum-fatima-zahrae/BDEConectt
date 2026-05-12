import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ evenements }) {
    const { flash } = usePage().props;

    const supprimer = (id) => {
        if (confirm('Supprimer cet événement ?')) {
            router.delete(`/admin/evenements/${id}`);
        }
    };

    return (
        <>
            <Head title="Gestion Événements" />
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-red-600">BDEConnect</Link>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="text-gray-600 hover:text-red-600">Dashboard</Link>
                        <Link href="/logout" method="post" as="button" className="text-gray-600 hover:text-red-600">Déconnexion</Link>
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto p-6">
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Gestion des Événements</h2>
                        <Link
                            href="/admin/evenements/create"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            + Nouvel événement
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">Titre</th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">Date</th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">Lieu</th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">Capacité</th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {evenements.map(ev => (
                                    <tr key={ev.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-800">{ev.titre}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(ev.date_debut).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{ev.lieu}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {ev.inscriptions_count} / {ev.capacite_max}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Link
                                                href={`/admin/evenements/${ev.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700 text-sm underline"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => supprimer(ev.id)}
                                                className="text-red-500 hover:text-red-700 text-sm underline"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {evenements.length === 0 && (
                            <p className="text-center text-gray-500 py-8">Aucun événement créé.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}