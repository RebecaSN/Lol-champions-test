import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionsListComponent } from './champions-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { ChampionsListRoutes } from './champions-list.routing';
import { DynamicPanelBodyModule } from '../components/dynamic-panel-body/dynamic-panel-body.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    ChampionsListRoutes,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,

    AngularMaterialModule,
    DynamicPanelBodyModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ChampionsListComponent]
})
export class ChampionsListModule { }
