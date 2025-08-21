<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\DataMigrationItem
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $data_type
 * @property string $status
 * @property array|null $data_payload
 * @property string|null $source_file
 * @property int $created_by
 * @property int|null $reviewed_by
 * @property int|null $approved_by
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $production_at
 * @property string|null $review_notes
 * @property string|null $approval_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $creator
 * @property-read User|null $reviewer
 * @property-read User|null $approver
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereDataType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereDataPayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereSourceFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereReviewedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereProductionAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereReviewNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereApprovalNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem underReview()
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem approved()
 * @method static \Illuminate\Database\Eloquent\Builder|DataMigrationItem inProduction()
 * @method static \Database\Factories\DataMigrationItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DataMigrationItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'data_type',
        'status',
        'data_payload',
        'source_file',
        'created_by',
        'reviewed_by',
        'approved_by',
        'reviewed_at',
        'approved_at',
        'production_at',
        'review_notes',
        'approval_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'data_payload' => 'array',
        'reviewed_at' => 'datetime',
        'approved_at' => 'datetime',
        'production_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'data_migration_items';

    /**
     * Get the user who created this migration item.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who reviewed this migration item.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Get the user who approved this migration item.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Scope a query to only include items under review.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUnderReview($query)
    {
        return $query->where('status', 'under_review');
    }

    /**
     * Scope a query to only include approved items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include items in production.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInProduction($query)
    {
        return $query->where('status', 'in_production');
    }

    /**
     * Get the display name for the data type.
     *
     * @return string
     */
    public function getDataTypeDisplayAttribute(): string
    {
        return match ($this->data_type) {
            'customer_records' => 'Customer Records',
            'product_catalogs' => 'Product Catalogs',
            'service_accounts' => 'Service Accounts',
            'billing_accounts' => 'Billing Accounts',
            'sales_orders' => 'Sales Orders',
            default => ucfirst(str_replace('_', ' ', $this->data_type)),
        };
    }

    /**
     * Get the display name for the status.
     *
     * @return string
     */
    public function getStatusDisplayAttribute(): string
    {
        return match ($this->status) {
            'under_review' => 'Under Review',
            'approved' => 'Approved',
            'in_production' => 'In Production',
            default => ucfirst(str_replace('_', ' ', $this->status)),
        };
    }
}