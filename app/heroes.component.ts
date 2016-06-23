import {Component,OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
    selector: 'my-heroes',
    template: `
        <h2>My Heroes</h2>
        <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <div *ngIf="selectedHero">
            <h2>
                {{selectedHero.name | uppercase}} is my hero
            </h2>
            <button (click)="gotoDetail()">View Details</button>
        </div>
        
    `,
    directives:[HeroDetailComponent],

})
export class HeroesComponent implements OnInit{
    selectedHero: Hero;     
    heroes:Hero[];
    constructor(
        private router: Router,
        private heroService: HeroService
    ) { }
    getHeroes(){
        this.heroService.getHeroes().then(heroes=>this.heroes=heroes);
    }
    ngOnInit(){
        this.getHeroes();
    }

    onSelect(hero: Hero){this.selectedHero=hero;}

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}

