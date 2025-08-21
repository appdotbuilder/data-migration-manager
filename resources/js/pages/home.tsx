import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
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
    [key: string]: unknown;
}

interface Props {
    statistics: {
        total_items: number;
        under_review: number;
        approved: number;
        in_production: number;
        total_users: number;
        reviewers: number;
        approvers: number;
    };
    recentItems: DataMigrationItem[];
    userRole: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Home({ statistics, recentItems, userRole }: Props) {
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
                return 'Customer Records';
            case 'product_catalogs':
                return 'Product Catalogs';
            case 'service_accounts':
                return 'Service Accounts';
            case 'billing_accounts':
                return 'Billing Accounts';
            case 'sales_orders':
                return 'Sales Orders';
            default:
                return dataType;
        }
    };

    const getRoleDisplay = (role: string) => {
        switch (role) {
            case 'superadmin':
                return 'Super Admin';
            case 'reviewer':
                return 'Reviewer';
            case 'approver':
                return 'Approver';
            default:
                return role;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        📋 Data Migration Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Welcome back! You're logged in as a <span className="font-medium">{getRoleDisplay(userRole)}</span>
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {statistics.total_items}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Items
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                                    {statistics.under_review}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Under Review
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                                    {statistics.approved}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Approved
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                                    {statistics.in_production}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    In Production
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href={route('data-migration.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        ➕ Create Migration Item
                    </Link>
                    <Link
                        href={route('data-migration.index')}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        📋 View All Items
                    </Link>
                </div>

                {/* Recent Items */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📋 Recent Migration Items
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentItems.length > 0 ? (
                            recentItems.map((item) => (
                                <div key={item.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('data-migration.show', item.id)}
                                                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                                                >
                                                    {item.title}
                                                </Link>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                    {getStatusDisplay(item.status)}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span>{getDataTypeDisplay(item.data_type)}</span>
                                                <span>•</span>
                                                <span>Created by {item.creator.name}</span>
                                                <span>•</span>
                                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link
                                                href={route('data-migration.show', item.id)}
                                                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                View →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center">
                                <span className="text-4xl mb-4 block">📝</span>
                                <p className="text-gray-500 dark:text-gray-400">
                                    No migration items yet.{' '}
                                    <Link
                                        href={route('data-migration.create')}
                                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Create your first one
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            👥 Team Overview
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
                                <span className="font-medium">{statistics.total_users}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Reviewers:</span>
                                <span className="font-medium">{statistics.reviewers}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Approvers:</span>
                                <span className="font-medium">{statistics.approvers}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            📈 Workflow Status
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Completion Rate:</span>
                                <span className="font-medium">
                                    {statistics.total_items > 0 
                                        ? Math.round((statistics.in_production / statistics.total_items) * 100)
                                        : 0}%
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Approval Rate:</span>
                                <span className="font-medium">
                                    {statistics.total_items > 0 
                                        ? Math.round(((statistics.approved + statistics.in_production) / statistics.total_items) * 100)
                                        : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            🎯 Your Role
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Current Role:</span>
                                <span className="font-medium">{getRoleDisplay(userRole)}</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                {userRole === 'superadmin' && 'Full system access and user management'}
                                {userRole === 'reviewer' && 'Create and manage migration items'}
                                {userRole === 'approver' && 'Review and approve migration items'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}