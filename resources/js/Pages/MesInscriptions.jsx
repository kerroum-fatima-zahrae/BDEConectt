import { Head, Link, router, usePage } from '@inertiajs/react';

export default function MesInscriptions({ inscriptions }) {
    const { flash } = usePage().props;

    const annuler = (id) => {
        if (confirm('Annuler cette inscription ?')) {
            router.patch(`/inscriptions/${id}/annuler`);
        }
    };

    const statutColor = (statut) => {
        if (statut === 'confirmée') return 'bg-green-100 text-green-700';
        if (statut === 'liste_attente') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <>
            <Head title="Mes Inscriptions" />
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-red-600">BDEConnect</Link>
                    <Link href="/logout" method="post" as="button" className="text-gray-600 hover:text-red-600">Déconnexion</Link>
                </nav>

                <div className="max-w-4xl mx-auto p-6">
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Mes Inscriptions</h2>

                    {inscriptions.length === 0 ? (
                        <p className="text-gray-500 text-center py-12">Vous n'avez aucune inscription.</p>
                    ) : (
                        <div className="space-y-4">
                            {inscriptions.map(inscription => (
                                <div key={inscription.id} className="bg-white rounded-xl shadow p-5 border border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{inscription.evenement.titre}</h3>
                                        <p className="text-gray-500 text-sm">{inscription.evenement.lieu}</p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(inscription.evenement.date_debut).toLocaleDateString('fr-FR')}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Inscrit le : {new Date(inscription.date_inscription).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statutColor(inscription.statut)}`}>
                                            {inscription.statut}
                                        </span>
                                        {inscription.statut !== 'annulée' && (
                                            <button
                                                onClick={() => annuler(inscription.id)}
                                                className="text-sm text-red-500 hover:text-red-700 underline"
                                            >
                                                Annuler
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}