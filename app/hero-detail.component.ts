import {Component,OnInit} from '@angular/core';
import {Hero} from './hero';
import { RouteParams } from '@angular/router-deprecated';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-detail',
    template: `
        <div *ngIf="hero">
            <h2>{{hero.name}} details!</h2>
            <div><label>id: </label>{{hero.id}}</div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name">
            </div>
            <button (click)="goBack()">Back</button>
        </div>
    `
})

export class HeroDetailComponent implements OnInit {
    hero:Hero;
    constructor(
        private heroService: HeroService,
        private routerParams: RouteParams
    ) {}
    ngOnInit() {
        let id = +this.routerParams.get('id');
        this.heroService.getHero(id).then(hero=>this.hero=hero);
    }
    goBack() {
        window.history.back();
    }
}