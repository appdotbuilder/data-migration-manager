import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface DataMigrationItem {
    id: number;
    title: string;
    description: string | null;
    data_type: string;
    status: string;
    source_file: string | null;
    created_at: string;
    reviewed_at: string | null;
    approved_at: string | null;
    production_at: string | null;
    review_notes: string | null;
    approval_notes: string | null;
    creator: {
        id: number;
        name: string;
        email: string;
    };
    reviewer: {
        id: number;
        name: string;
        email: string;
    } | null;
    approver: {
        id: number;
        name: string;
        email: string;
    } | null;
    [key: string]: unknown;
}

interface Props {
    item: DataMigrationItem;
    canApprove: boolean;
    canMarkProduction: boolean;
    [key: string]: unknown;
}

export default function ShowDataMigration({ item, canApprove }: Props) {
    const page = usePage();
    const auth = page.props.auth as { user: { role: string; id: number } };
    
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
            title: item.title,
            href: `/data-migration/${item.id}`,
        },
    ];
    const [showApprovalForm, setShowApprovalForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        approval_notes: '',
    });

    const handleApprove = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('data-migration.approve', item.id), {
            onSuccess: () => {
                setShowApprovalForm(false);
            }
        });
    };

    const handleDownloadPdf = () => {
        router.visit(route('data-migration.pdf', item.id));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'under_review':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
            case 'in_production':
                return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700';
        }
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'under_review':
                return '⏳ Under Review';
            case 'approved':
                return '✅ Approved';
            case 'in_production':
                return '🚀 In Production';
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
            <Head title={`Migration Item: ${item.title}`} />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                        </h1>
                        <div className="mt-2 flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                                {getStatusDisplay(item.status)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {getDataTypeDisplay(item.data_type)}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        {item.status === 'under_review' && (auth.user.id === item.creator?.id || auth.user.role === 'superadmin') && (
                            <Link
                                href={route('data-migration.edit', item.id)}
                                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                ✏️ Edit
                            </Link>
                        )}
                        {canApprove && (
                            <button
                                onClick={() => setShowApprovalForm(true)}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                ✅ Approve
                            </button>
                        )}
                        {item.status === 'approved' && (
                            <button
                                onClick={handleDownloadPdf}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                📄 Download PDF
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📋 Basic Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Title
                                    </label>
                                    <p className="text-sm text-gray-900 dark:text-white">{item.title}</p>
                                </div>
                                {item.description && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Description
                                        </label>
                                        <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                            {item.description}
                                        </p>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Data Type
                                        </label>
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {getDataTypeDisplay(item.data_type)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Status
                                        </label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status).replace('border-', '')}`}>
                                            {getStatusDisplay(item.status)}
                                        </span>
                                    </div>
                                </div>
                                {item.source_file && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Source File
                                        </label>
                                        <p className="text-sm text-gray-900 dark:text-white">📁 {item.source_file}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📅 Timeline
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        <li>
                                            <div className="relative pb-8">
                                                <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                                                <div className="relative flex space-x-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                        ➕
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Created by <span className="font-medium text-gray-900 dark:text-white">{item.creator.name}</span>
                                                            </p>
                                                        </div>
                                                        <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(item.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {item.reviewed_at && item.reviewer && (
                                            <li>
                                                <div className="relative pb-8">
                                                    <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                                                    <div className="relative flex space-x-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white text-sm">
                                                            👀
                                                        </div>
                                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                            <div>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Reviewed by <span className="font-medium text-gray-900 dark:text-white">{item.reviewer.name}</span>
                                                                </p>
                                                            </div>
                                                            <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date(item.reviewed_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        {item.approved_at && item.approver && (
                                            <li>
                                                <div className="relative pb-8">
                                                    {item.production_at && (
                                                        <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                                                    )}
                                                    <div className="relative flex space-x-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">
                                                            ✅
                                                        </div>
                                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                            <div>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Approved by <span className="font-medium text-gray-900 dark:text-white">{item.approver.name}</span>
                                                                </p>
                                                            </div>
                                                            <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date(item.approved_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        {item.production_at && (
                                            <li>
                                                <div className="relative">
                                                    <div className="relative flex space-x-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                                                            🚀
                                                        </div>
                                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                            <div>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Marked as in production
                                                                </p>
                                                            </div>
                                                            <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date(item.production_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Team */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    👥 Team
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Creator
                                    </label>
                                    <p className="text-sm text-gray-900 dark:text-white">{item.creator.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.creator.email}</p>
                                </div>
                                {item.reviewer && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Reviewer
                                        </label>
                                        <p className="text-sm text-gray-900 dark:text-white">{item.reviewer.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.reviewer.email}</p>
                                    </div>
                                )}
                                {item.approver && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Approver
                                        </label>
                                        <p className="text-sm text-gray-900 dark:text-white">{item.approver.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.approver.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {(item.review_notes || item.approval_notes) && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        📝 Notes
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    {item.review_notes && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Review Notes
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                                {item.review_notes}
                                            </p>
                                        </div>
                                    )}
                                    {item.approval_notes && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Approval Notes
                                            </label>
                                            <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                                {item.approval_notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Approval Modal */}
            {showApprovalForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <form onSubmit={handleApprove}>
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ✅ Approve Migration Item
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Approval Notes (Optional)
                                    </label>
                                    <textarea
                                        value={data.approval_notes}
                                        onChange={(e) => setData('approval_notes', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Add any notes about this approval..."
                                    />
                                    {errors.approval_notes && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.approval_notes}</p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    This action will mark the migration item as approved and allow PDF generation.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowApprovalForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                    disabled={processing}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? '⏳ Approving...' : '✅ Approve'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}