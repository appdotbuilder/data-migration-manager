<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApproveDataMigrationItemRequest;
use App\Http\Requests\MarkProductionRequest;
use App\Http\Requests\StoreDataMigrationItemRequest;
use App\Http\Requests\UpdateDataMigrationItemRequest;
use App\Models\DataMigrationItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataMigrationItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DataMigrationItem::with(['creator', 'reviewer', 'approver'])
            ->latest();

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by data type
        if ($request->has('data_type') && $request->data_type !== '') {
            $query->where('data_type', $request->data_type);
        }

        // Search by title
        if ($request->has('search') && $request->search !== '') {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $items = $query->paginate(15)->withQueryString();

        return Inertia::render('data-migration/index', [
            'items' => $items,
            'filters' => [
                'status' => $request->status ?? '',
                'data_type' => $request->data_type ?? '',
                'search' => $request->search ?? '',
            ],
            'statistics' => [
                'total' => DataMigrationItem::count(),
                'under_review' => DataMigrationItem::underReview()->count(),
                'approved' => DataMigrationItem::approved()->count(),
                'in_production' => DataMigrationItem::inProduction()->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('data-migration/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataMigrationItemRequest $request)
    {
        $item = DataMigrationItem::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('data-migration.show', $item)
            ->with('success', 'Migration item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DataMigrationItem $dataMigrationItem)
    {
        $dataMigrationItem->load(['creator', 'reviewer', 'approver']);

        return Inertia::render('data-migration/show', [
            'item' => $dataMigrationItem,
            'canApprove' => auth()->user()->isApprover() && $dataMigrationItem->status === 'under_review',
            'canMarkProduction' => auth()->user()->isSuperadmin() && $dataMigrationItem->status === 'approved',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataMigrationItem $dataMigrationItem)
    {
        // Only allow editing if status is under_review and user is creator or superadmin
        if ($dataMigrationItem->status !== 'under_review' && 
            !auth()->user()->isSuperadmin() && 
            $dataMigrationItem->created_by !== auth()->id()) {
            return redirect()->route('data-migration.show', $dataMigrationItem)
                ->with('error', 'You cannot edit this migration item.');
        }

        return Inertia::render('data-migration/edit', [
            'item' => $dataMigrationItem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDataMigrationItemRequest $request, DataMigrationItem $dataMigrationItem)
    {
        // Only allow updates if status is under_review and user is creator or superadmin
        if ($dataMigrationItem->status !== 'under_review' && 
            !auth()->user()->isSuperadmin() && 
            $dataMigrationItem->created_by !== auth()->id()) {
            return redirect()->route('data-migration.show', $dataMigrationItem)
                ->with('error', 'You cannot edit this migration item.');
        }

        $dataMigrationItem->update($request->validated());

        return redirect()->route('data-migration.show', $dataMigrationItem)
            ->with('success', 'Migration item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataMigrationItem $dataMigrationItem)
    {
        // Only allow deletion if status is under_review and user is creator or superadmin
        if ($dataMigrationItem->status !== 'under_review' && 
            !auth()->user()->isSuperadmin() && 
            $dataMigrationItem->created_by !== auth()->id()) {
            return redirect()->route('data-migration.index')
                ->with('error', 'You cannot delete this migration item.');
        }

        $dataMigrationItem->delete();

        return redirect()->route('data-migration.index')
            ->with('success', 'Migration item deleted successfully.');
    }


}