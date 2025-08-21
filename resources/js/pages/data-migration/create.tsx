import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Migration Items',
        href: '/data-migration',
    },
    {
        title: 'Create',
        href: '/data-migration/create',
    },
];

export default function CreateDataMigration() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        data_type: '',
        source_file: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('data-migration.store'));
    };

    const dataTypes = [
        { value: 'customer_records', label: '👥 Customer Records' },
        { value: 'product_catalogs', label: '📦 Product Catalogs' },
        { value: 'service_accounts', label: '🔧 Service Accounts' },
        { value: 'billing_accounts', label: '💳 Billing Accounts' },
        { value: 'sales_orders', label: '🛒 Sales Orders' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Migration Item" />
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        ➕ Create Migration Item
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Create a new data migration item for review and approval.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter a descriptive title for this migration"
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                            )}
                        </div>

                        {/* Data Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Data Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.data_type}
                                onChange={(e) => setData('data_type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            >
                                <option value="">Select data type</option>
                                {dataTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.data_type && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.data_type}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Provide details about this migration item..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                            )}
                        </div>

                        {/* Source File */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Source File
                            </label>
                            <input
                                type="text"
                                value={data.source_file}
                                onChange={(e) => setData('source_file', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="e.g., customers_export_2024.xlsx"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Optional: Name of the source file if this migration was created from an import
                            </p>
                            {errors.source_file && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.source_file}</p>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 dark:bg-blue-900/20 dark:border-blue-800">
                            <div className="flex">
                                <span className="text-blue-400 mr-2">ℹ️</span>
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    <p className="font-medium mb-1">What happens next?</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• Your migration item will be created with "Under Review" status</li>
                                        <li>• Approvers can review and approve the item</li>
                                        <li>• Once approved, you can download a PDF report</li>
                                        <li>• Superadmins can mark approved items as "In Production"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? '⏳ Creating...' : '✅ Create Migration Item'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}