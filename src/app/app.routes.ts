import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MeteoPageComponent } from './pages/meteo-page/meteo-page.component';

export const routes: Routes = [
    {
        path: '',
        component: MeteoPageComponent
    },
    {
        path: 'meteo/:city',
        component: MeteoPageComponent
    }
];
