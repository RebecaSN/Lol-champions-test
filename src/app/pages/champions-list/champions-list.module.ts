import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionsListComponent } from './champions-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { ChampionsListRoutes } from './champions-list.routing';
import { DynamicPanelBodyModule } from '../components/dynamic-panel-body/dynamic-panel-body.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from 'src/app/core/services/utilities/button-renderer.component';
import { EditChampionComponent } from './modals/edit-champion/edit-champion.component';
import { DynamicInputModule } from '../components/dynamic-input/dynamic-input.module';
import { DynamicSelectModule } from '../components/dynamic-select/dynamic-select.module';

@NgModule({
  declarations: [
    ChampionsListComponent,
    ButtonRendererComponent,
    EditChampionComponent
  ],
  imports: [
    CommonModule,
    ChampionsListRoutes,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,

    AngularMaterialModule,
    DynamicPanelBodyModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    DynamicSelectModule,
    DynamicInputModule
  ]
})
export class ChampionsListModule { }
