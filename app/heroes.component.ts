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
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  constructor(
    private router: Router,
    private heroService: HeroService) { }
  getHeroes() {
    this.heroService
        .getHeroes()
        .then(heroes => this.heroes = heroes)
        .catch(error => this.error = error); // TODO: Display error message
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }
  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }
  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.addingHero = false;
  }
  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}