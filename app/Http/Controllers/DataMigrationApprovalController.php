<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApproveDataMigrationItemRequest;
use App\Models\DataMigrationItem;

class DataMigrationApprovalController extends Controller
{
    /**
     * Approve a migration item.
     */
    public function store(ApproveDataMigrationItemRequest $request, DataMigrationItem $dataMigrationItem)
    {
        if ($dataMigrationItem->status !== 'under_review') {
            return redirect()->route('data-migration.show', $dataMigrationItem)
                ->with('error', 'This item cannot be approved.');
        }

        $dataMigrationItem->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'approval_notes' => $request->approval_notes,
        ]);

        return redirect()->route('data-migration.show', $dataMigrationItem)
            ->with('success', 'Migration item approved successfully.');
    }
}