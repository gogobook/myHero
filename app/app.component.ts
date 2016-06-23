import {Component} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from './hero.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {DashboardComponent} from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
    selector: 'my-app',
    template: `
        <h1> {{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HeroService]


})
@RouteConfig([
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: 'heroes',
        name: 'Heroes',
        component: HeroesComponent
    }
])
export class AppComponent {
    title='Tour of Heroes';
}