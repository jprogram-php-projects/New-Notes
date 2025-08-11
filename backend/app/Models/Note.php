<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Note extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'text', 'user_id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return Carbon::parse($date)
            ->setTimezone('America/Sao_Paulo')
            ->format('Y-m-d H:i:s');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

