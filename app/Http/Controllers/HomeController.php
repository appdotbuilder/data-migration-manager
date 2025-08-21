<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DataMigrationItem;
use App\Models\User;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with dashboard data.
     */
    public function index()
    {
        // If user is not authenticated, show welcome page
        if (!auth()->check()) {
            return Inertia::render('welcome');
        }

        // Get statistics for the dashboard
        $statistics = [
            'total_items' => DataMigrationItem::count(),
            'under_review' => DataMigrationItem::underReview()->count(),
            'approved' => DataMigrationItem::approved()->count(),
            'in_production' => DataMigrationItem::inProduction()->count(),
            'total_users' => User::count(),
            'reviewers' => User::reviewers()->count(),
            'approvers' => User::approvers()->count(),
        ];

        // Get recent items based on user role
        $recentItems = DataMigrationItem::with(['creator', 'reviewer', 'approver'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('home', [
            'statistics' => $statistics,
            'recentItems' => $recentItems,
            'userRole' => auth()->user()->role,
        ]);
    }
}