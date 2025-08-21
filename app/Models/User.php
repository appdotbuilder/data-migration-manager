<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\DataMigrationItem;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DataMigrationItem> $createdMigrationItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DataMigrationItem> $reviewedMigrationItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DataMigrationItem> $approvedMigrationItems
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User superadmins()
 * @method static \Illuminate\Database\Eloquent\Builder|User reviewers()
 * @method static \Illuminate\Database\Eloquent\Builder|User approvers()
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the migration items created by this user.
     */
    public function createdMigrationItems(): HasMany
    {
        return $this->hasMany(DataMigrationItem::class, 'created_by');
    }

    /**
     * Get the migration items reviewed by this user.
     */
    public function reviewedMigrationItems(): HasMany
    {
        return $this->hasMany(DataMigrationItem::class, 'reviewed_by');
    }

    /**
     * Get the migration items approved by this user.
     */
    public function approvedMigrationItems(): HasMany
    {
        return $this->hasMany(DataMigrationItem::class, 'approved_by');
    }

    /**
     * Scope a query to only include superadmins.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSuperadmins($query)
    {
        return $query->where('role', 'superadmin');
    }

    /**
     * Scope a query to only include reviewers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeReviewers($query)
    {
        return $query->where('role', 'reviewer');
    }

    /**
     * Scope a query to only include approvers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApprovers($query)
    {
        return $query->where('role', 'approver');
    }

    /**
     * Check if the user is a superadmin.
     *
     * @return bool
     */
    public function isSuperadmin(): bool
    {
        return $this->role === 'superadmin';
    }

    /**
     * Check if the user is a reviewer.
     *
     * @return bool
     */
    public function isReviewer(): bool
    {
        return $this->role === 'reviewer';
    }

    /**
     * Check if the user is an approver.
     *
     * @return bool
     */
    public function isApprover(): bool
    {
        return $this->role === 'approver';
    }

    /**
     * Get the display name for the user role.
     *
     * @return string
     */
    public function getRoleDisplayAttribute(): string
    {
        return match ($this->role) {
            'superadmin' => 'Super Admin',
            'reviewer' => 'Reviewer',
            'approver' => 'Approver',
            default => ucfirst($this->role),
        };
    }
}
