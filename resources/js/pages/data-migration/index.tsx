import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface DataMigrationItem {
    id: number;
    title: string;
    data_type: string;
    status: string;
    created_at: string;
    creator: {
        name: string;
    };
    reviewer?: {
        name: string;
    } | null;
    approver?: {
        name: string;
    } | null;
    [key: string]: unknown;
}

interface Props {
    items: {
        data: DataMigrationItem[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
    };
    filters: {
        status: string;
        data_type: string;
        search: string;
    };
    statistics: {
        total: number;
        under_review: number;
        approved: number;
        in_production: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Migration Items',
        href: '/data-migration',
    },
];

export default function DataMigrationIndex({ items, filters, statistics }: Props) {

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('data-migration.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'under_review':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'in_production':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'under_review':
                return 'Under Review';
            case 'approved':
                return 'Approved';
            case 'in_production':
                return 'In Production';
            default:
                return status;
        }
    };

    const getDataTypeDisplay = (dataType: string) => {
        switch (dataType) {
            case 'customer_records':
                return '👥 Customer Records';
            case 'product_catalogs':
                return '📦 Product Catalogs';
            case 'service_accounts':
                return '🔧 Service Accounts';
            case 'billing_accounts':
                return '💳 Billing Accounts';
            case 'sales_orders':
                return '🛒 Sales Orders';
            default:
                return dataType;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Migration Items" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            📋 Data Migration Items
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Manage and track your data migration items through the approval workflow.
                        </p>
                    </div>
                    <Link
                        href={route('data-migration.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        ➕ Create New Item
                    </Link>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center">
                            <span className="text-xl mr-2">📊</span>
                            <div>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {statistics.total}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center">
                            <span className="text-xl mr-2">⏳</span>
                            <div>
                                <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                                    {statistics.under_review}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Under Review</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center">
                            <span className="text-xl mr-2">✅</span>
                            <div>
                                <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                                    {statistics.approved}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center">
                            <span className="text-xl mr-2">🚀</span>
                            <div>
                                <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                                    {statistics.in_production}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">In Production</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">All Statuses</option>
                                <option value="under_review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="in_production">In Production</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Data Type
                            </label>
                            <select
                                value={filters.data_type}
                                onChange={(e) => handleFilterChange('data_type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">All Types</option>
                                <option value="customer_records">Customer Records</option>
                                <option value="product_catalogs">Product Catalogs</option>
                                <option value="service_accounts">Service Accounts</option>
                                <option value="billing_accounts">Billing Accounts</option>
                                <option value="sales_orders">Sales Orders</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {items.data.length > 0 ? (
                            items.data.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('data-migration.show', item.id)}
                                                    className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {item.title}
                                                </Link>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                    {getStatusDisplay(item.status)}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>{getDataTypeDisplay(item.data_type)}</span>
                                                <span>•</span>
                                                <span>Created by {item.creator.name}</span>
                                                <span>•</span>
                                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                            {(item.reviewer || item.approver) && (
                                                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {item.reviewer && <span>Reviewed by {item.reviewer.name}</span>}
                                                    {item.reviewer && item.approver && <span>•</span>}
                                                    {item.approver && <span>Approved by {item.approver.name}</span>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <Link
                                                href={route('data-migration.show', item.id)}
                                                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                View Details
                                            </Link>
                                            {item.status === 'under_review' && (
                                                <Link
                                                    href={route('data-migration.edit', item.id)}
                                                    className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <span className="text-4xl mb-4 block">📝</span>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No migration items found
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    {filters.status || filters.data_type || filters.search 
                                        ? 'Try adjusting your filters to see more results.'
                                        : 'Get started by creating your first migration item.'
                                    }
                                </p>
                                <Link
                                    href={route('data-migration.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    ➕ Create Migration Item
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {items.data.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing {items.meta.from} to {items.meta.to} of {items.meta.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    {items.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}