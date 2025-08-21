<?php

namespace Database\Factories;

use App\Models\DataMigrationItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataMigrationItem>
 */
class DataMigrationItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<DataMigrationItem>
     */
    protected $model = DataMigrationItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dataTypes = ['customer_records', 'product_catalogs', 'service_accounts', 'billing_accounts', 'sales_orders'];
        $statuses = ['under_review', 'approved', 'in_production'];
        
        $status = fake()->randomElement($statuses);
        
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'data_type' => fake()->randomElement($dataTypes),
            'status' => $status,
            'data_payload' => $this->generateSampleData(),
            'source_file' => fake()->optional()->word() . '.xlsx',
            'created_by' => User::factory(),
            'reviewed_by' => $status !== 'under_review' ? User::factory() : null,
            'approved_by' => $status === 'approved' || $status === 'in_production' ? User::factory() : null,
            'reviewed_at' => $status !== 'under_review' ? fake()->dateTimeBetween('-1 month', 'now') : null,
            'approved_at' => $status === 'approved' || $status === 'in_production' ? fake()->dateTimeBetween('-1 month', 'now') : null,
            'production_at' => $status === 'in_production' ? fake()->dateTimeBetween('-1 week', 'now') : null,
            'review_notes' => $status !== 'under_review' ? fake()->optional()->sentence() : null,
            'approval_notes' => $status === 'approved' || $status === 'in_production' ? fake()->optional()->sentence() : null,
        ];
    }

    /**
     * Generate sample data payload based on data type.
     *
     * @return array
     */
    protected function generateSampleData(): array
    {
        return [
            'sample_records' => random_int(50, 500),
            'format' => 'JSON',
            'validation_status' => 'passed',
            'estimated_size' => fake()->randomFloat(2, 1, 100) . ' MB',
        ];
    }

    /**
     * Indicate that the item is under review.
     */
    public function underReview(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'under_review',
            'reviewed_by' => null,
            'approved_by' => null,
            'reviewed_at' => null,
            'approved_at' => null,
            'production_at' => null,
            'review_notes' => null,
            'approval_notes' => null,
        ]);
    }

    /**
     * Indicate that the item is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'reviewed_by' => User::factory(),
            'approved_by' => User::factory(),
            'reviewed_at' => fake()->dateTimeBetween('-1 month', '-1 week'),
            'approved_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'production_at' => null,
            'review_notes' => fake()->sentence(),
            'approval_notes' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the item is in production.
     */
    public function inProduction(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_production',
            'reviewed_by' => User::factory(),
            'approved_by' => User::factory(),
            'reviewed_at' => fake()->dateTimeBetween('-2 months', '-1 month'),
            'approved_at' => fake()->dateTimeBetween('-1 month', '-1 week'),
            'production_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'review_notes' => fake()->sentence(),
            'approval_notes' => fake()->sentence(),
        ]);
    }
}