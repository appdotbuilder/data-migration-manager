<?php

namespace Database\Seeders;

use App\Models\DataMigrationItem;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test users with different roles
        $superadmin = User::factory()->superadmin()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
        ]);

        $reviewer = User::factory()->reviewer()->create([
            'name' => 'Test Reviewer',
            'email' => 'reviewer@example.com',
        ]);

        $approver = User::factory()->approver()->create([
            'name' => 'Test Approver',
            'email' => 'approver@example.com',
        ]);

        // Create additional users
        User::factory(5)->reviewer()->create();
        User::factory(3)->approver()->create();

        // Create sample migration items
        DataMigrationItem::factory(15)->create([
            'created_by' => $reviewer->id,
        ]);

        DataMigrationItem::factory(10)->approved()->create([
            'created_by' => $reviewer->id,
            'reviewed_by' => $reviewer->id,
            'approved_by' => $approver->id,
        ]);

        DataMigrationItem::factory(5)->inProduction()->create([
            'created_by' => $reviewer->id,
            'reviewed_by' => $reviewer->id,
            'approved_by' => $approver->id,
        ]);
    }
}
