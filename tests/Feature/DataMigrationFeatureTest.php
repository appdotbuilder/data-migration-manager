<?php

use App\Models\DataMigrationItem;
use App\Models\User;

beforeEach(function () {
    $this->seed();
});

test('authenticated users can access home page', function () {
    $user = User::factory()->reviewer()->create();

    $response = $this->actingAs($user)->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('home')
        ->has('statistics')
        ->has('recentItems')
        ->where('userRole', 'reviewer')
    );
});

test('unauthenticated users see welcome page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('welcome'));
});

test('users can view migration items', function () {
    $user = User::factory()->reviewer()->create();

    $response = $this->actingAs($user)->get('/data-migration');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('data-migration/index')
        ->has('items.data')
        ->has('statistics')
    );
});

test('users can create migration items', function () {
    $user = User::factory()->reviewer()->create();

    $response = $this->actingAs($user)->post('/data-migration', [
        'title' => 'Test Migration',
        'description' => 'Test description',
        'data_type' => 'customer_records',
        'source_file' => 'test.xlsx',
    ]);

    $response->assertRedirect();
    
    $this->assertDatabaseHas('data_migration_items', [
        'title' => 'Test Migration',
        'created_by' => $user->id,
        'status' => 'under_review',
    ]);
});

test('approvers can approve migration items', function () {
    $reviewer = User::factory()->reviewer()->create();
    $approver = User::factory()->approver()->create();
    $item = DataMigrationItem::factory()->underReview()->create(['created_by' => $reviewer->id]);

    $response = $this->actingAs($approver)->post("/data-migration/{$item->id}/approve", [
        'approval_notes' => 'Looks good!',
    ]);

    $response->assertRedirect();
    expect($item->fresh()->status)->toBe('approved');
});

test('users can view single migration item', function () {
    $user = User::factory()->reviewer()->create();
    $item = DataMigrationItem::factory()->create(['created_by' => $user->id]);

    $response = $this->actingAs($user)->get("/data-migration/{$item->id}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('data-migration/show')
        ->where('item.id', $item->id)
    );
});

test('superadmins can mark items as production', function () {
    $superadmin = User::factory()->superadmin()->create();

    // Create some approved items
    DataMigrationItem::factory()->approved()->count(3)->create();

    $response = $this->actingAs($superadmin)->post('/data-migration/mark-production', [
        'file' => \Illuminate\Http\Testing\File::create('test.xlsx', 100),
    ]);

    $response->assertRedirect();
    expect(DataMigrationItem::inProduction()->count())->toBeGreaterThan(0);
});