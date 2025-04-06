import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MeteoPageComponent } from './pages/meteo-page/meteo-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'meteo/:city',
        component: MeteoPageComponent
    }
];
