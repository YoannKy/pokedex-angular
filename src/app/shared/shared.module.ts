import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MaterialModule } from './material/material.module';
import { HighlightPipe } from './pipes/highlight.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [HighlightPipe, LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxGraphModule,
    NgApexchartsModule,
  ],
  exports: [
    HighlightPipe,
    MaterialModule,
    LoaderComponent,
    FlexLayoutModule,
    NgxGraphModule,
    NgApexchartsModule,
  ],
})
export class SharedModule { }
