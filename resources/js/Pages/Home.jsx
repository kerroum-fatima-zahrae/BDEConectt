import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Home({ evenements }) {
    const { auth, flash } = usePage().props;

    const sinscrire = (id) => {
        router.post(`/evenements/${id}/inscrire`);
    };

    return (
        <>
            <Head title="Événements" />
            <div className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-red-600">BDEConnect</h1>
                    <div className="flex gap-4">
                        {auth.user ? (
                            <>
                                <Link href="/mes-inscriptions" className="text-gray-600 hover:text-red-600">Mes inscriptions</Link>
                                {auth.user.role === 'admin' && (
                                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-red-600">Dashboard Admin</Link>
                                )}
                                <Link href="/logout" method="post" as="button" className="text-gray-600 hover:text-red-600">Déconnexion</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-red-600">Connexion</Link>
                                <Link href="/register" className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">S'inscrire</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto p-6">
                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {flash.error}
                        </div>
                    )}

                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Événements à venir</h2>

                    {evenements.length === 0 ? (
                        <p className="text-gray-500 text-center py-12">Aucun événement à venir pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {evenements.map(ev => (
                                <div key={ev.id} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                                    {ev.image && (
                                        <img src={`/storage/${ev.image}`} alt={ev.titre} className="w-full h-40 object-cover rounded-lg mb-4" />
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-800">{ev.titre}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{ev.lieu}</p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(ev.date_debut).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                    <p className="text-gray-700 mt-2 text-sm">{ev.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-red-600 font-bold">{ev.prix} MAD</span>
                                        <span className="text-sm text-gray-500">
                                            {ev.inscriptions_confirmees_count} / {ev.capacite_max} places
                                        </span>
                                    </div>
                                    {auth.user && auth.user.role !== 'admin' && (
                                        <button
                                            onClick={() => sinscrire(ev.id)}
                                            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                                        >
                                            S'inscrire
                                        </button>
                                    )}
                                    {!auth.user && (
                                        <Link
                                            href="/login"
                                            className="mt-4 block text-center w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Connectez-vous pour s'inscrire
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}