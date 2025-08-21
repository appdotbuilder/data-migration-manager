import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Data Migration Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2 text-sm font-medium text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-6xl lg:flex-row lg:gap-12">
                        {/* Hero Section */}
                        <div className="flex-1 text-center lg:text-left lg:pr-12">
                            <div className="mb-6">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 mb-6">
                                    🚀 Data Migration Made Simple
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-6xl">
                                    📋 Data Migration
                                    <span className="block text-blue-600 dark:text-blue-400">Management System</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                    Streamline your data validation, review, and approval process. 
                                    Manage customer records, product catalogs, service accounts, and more 
                                    with role-based workflows and automated reporting.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-12">
                                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <span className="text-2xl mr-3">✅</span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Review & Approval</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Multi-stage workflow from "Under Review" to "Approved" with role-based permissions
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <span className="text-2xl mr-3">📊</span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Multiple Data Types</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Support for customer records, products, services, billing, and sales orders
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <span className="text-2xl mr-3">👥</span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">User Roles</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Superadmin, Reviewer, and Approver roles with appropriate permissions
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <span className="text-2xl mr-3">📄</span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">PDF Reports</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Generate detailed PDF reports for approved data migration items
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Go to Dashboard →
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Get Started →
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Demo/Preview Section */}
                        <div className="flex-1 mt-12 lg:mt-0">
                            <div className="rounded-lg bg-white shadow-xl border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Migration Dashboard Preview</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Under Review</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">12</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Approved</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">Customer Records Migration</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Under Review</div>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                                                Pending
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">Product Catalog Update</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Approved</div>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                Ready
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    Built with ❤️ for efficient data migration workflows
                </footer>
            </div>
        </>
    );
}