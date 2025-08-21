<?php

use App\Http\Controllers\DataMigrationApprovalController;
use App\Http\Controllers\DataMigrationItemController;
use App\Http\Controllers\DataMigrationPdfController;
use App\Http\Controllers\DataMigrationProductionController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard');
    
    // Data Migration Items routes
    Route::resource('data-migration', DataMigrationItemController::class)->names([
        'index' => 'data-migration.index',
        'create' => 'data-migration.create',
        'store' => 'data-migration.store',
        'show' => 'data-migration.show',
        'edit' => 'data-migration.edit',
        'update' => 'data-migration.update',
        'destroy' => 'data-migration.destroy',
    ])->parameters(['data-migration' => 'dataMigrationItem']);
    
    // Special routes for workflow actions
    Route::post('/data-migration/{dataMigrationItem}/approve', [DataMigrationApprovalController::class, 'store'])->name('data-migration.approve');
    Route::get('/data-migration/{dataMigrationItem}/pdf', [DataMigrationPdfController::class, 'show'])->name('data-migration.pdf');
    Route::post('/data-migration/mark-production', [DataMigrationProductionController::class, 'store'])->name('data-migration.mark-production');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
