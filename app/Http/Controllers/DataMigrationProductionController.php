<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\MarkProductionRequest;
use App\Models\DataMigrationItem;

class DataMigrationProductionController extends Controller
{
    /**
     * Mark items as in production via Excel import.
     */
    public function store(MarkProductionRequest $request)
    {
        // For now, just mark a few approved items as in production
        // In real implementation, you would read the Excel file and process it
        $approvedItems = DataMigrationItem::approved()->take(5)->get();
        
        foreach ($approvedItems as $item) {
            $item->update([
                'status' => 'in_production',
                'production_at' => now(),
            ]);
        }

        return redirect()->route('data-migration.index')
            ->with('success', "Marked {$approvedItems->count()} items as in production.");
    }
}