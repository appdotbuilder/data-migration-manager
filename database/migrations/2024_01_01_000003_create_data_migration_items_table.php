<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_migration_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('data_type', [
                'customer_records',
                'product_catalogs',
                'service_accounts',
                'billing_accounts',
                'sales_orders'
            ]);
            $table->enum('status', [
                'under_review',
                'approved',
                'in_production'
            ])->default('under_review');
            $table->json('data_payload')->nullable()->comment('JSON data for the migration item');
            $table->string('source_file')->nullable()->comment('Original file name if imported');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('production_at')->nullable();
            $table->text('review_notes')->nullable();
            $table->text('approval_notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('data_type');
            $table->index(['status', 'created_at']);
            $table->index(['data_type', 'status']);
            $table->index('created_by');
            $table->index('reviewed_by');
            $table->index('approved_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_migration_items');
    }
};