import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isModuleLoading$: Observable<boolean>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isModuleLoading$ = this.router.events.pipe(
      map((event: RouterEvent) => event instanceof RouteConfigLoadStart),
    );
  }
}
