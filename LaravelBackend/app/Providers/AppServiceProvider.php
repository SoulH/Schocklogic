<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use \App\Data\UnitOfWork;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UnitOfWork::class, fn($app) => new UnitOfWork());
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
