import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ evenement }) {
    const { data, setData, put, processing, errors } = useForm({
        titre: evenement.titre,
        description: evenement.description || '',
        date_debut: evenement.date_debut ? evenement.date_debut.slice(0, 16) : '',
        date_fin: evenement.date_fin ? evenement.date_fin.slice(0, 16) : '',
        lieu: evenement.lieu,
        capacite_max: evenement.capacite_max,
        prix: evenement.prix,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/evenements/${evenement.id}`);
    };

    return (
        <>
            <Head title="Modifier l'événement" />
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-red-600">BDEConnect</Link>
                    <Link href="/admin/evenements" className="text-gray-600 hover:text-red-600">← Retour</Link>
                </nav>

                <div className="max-w-2xl mx-auto p-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Modifier l'événement</h2>

                    <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 border border-gray-100 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                            <input
                                type="text"
                                value={data.titre}
                                onChange={e => setData('titre', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                                <input
                                    type="datetime-local"
                                    value={data.date_debut}
                                    onChange={e => setData('date_debut', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.date_debut && <p className="text-red-500 text-sm mt-1">{errors.date_debut}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                                <input
                                    type="datetime-local"
                                    value={data.date_fin}
                                    onChange={e => setData('date_fin', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.date_fin && <p className="text-red-500 text-sm mt-1">{errors.date_fin}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                            <input
                                type="text"
                                value={data.lieu}
                                onChange={e => setData('lieu', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            {errors.lieu && <p className="text-red-500 text-sm mt-1">{errors.lieu}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Capacité max</label>
                                <input
                                    type="number"
                                    value={data.capacite_max}
                                    onChange={e => setData('capacite_max', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.capacite_max && <p className="text-red-500 text-sm mt-1">{errors.capacite_max}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (MAD)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.prix}
                                    onChange={e => setData('prix', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
                        >
                            {processing ? 'Modification...' : 'Modifier l\'événement'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}