import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgxGraphService, NgxData } from '../../core/ngx-graph.service';

import { Species } from '../../shared/models/species.model';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.scss'],
})
export class EvolutionsComponent implements OnInit, OnChanges {
  @Input() species: Species;

  ngxData: NgxData;
  draggingEnabled = false;
  panningEnabled = true;
  zoomEnabled = false;
  zoomSpeed = 0.1;
  minZoomLevel = 0.1;
  maxZoomLevel = 2.0;
  panOnZoom = true;
  autoZoom = true;
  autoCenter = true;
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
  private graphService: NgxGraphService,
  private route: ActivatedRoute,
  private router: Router,
) { }

  ngOnInit(): void {
    this.ngxData = this.graphService.setDataFromEvolutionChain(this.species.evolution_chain);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.species?.currentValue) {
      this.ngxData = this.graphService.setDataFromEvolutionChain(changes.species.currentValue.evolution_chain);
    }
  }

  goToDetails(id: string): void {
    this.router.navigate(['../', id], { relativeTo: this.route });
  }

}
