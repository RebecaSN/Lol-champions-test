import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummonerSpellsRoutes } from './summoner-spells.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { DynamicPanelBodyModule } from '../components/dynamic-panel-body/dynamic-panel-body.module';
import { SummonerSpellsComponent } from './summoner-spells.component';
import { AgGridModule } from 'ag-grid-angular';
// import { TooltipCellRendererComponent } from 'src/app/core/services/utilities/tooltip-cell-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    SummonerSpellsRoutes,
    FlexLayoutModule,
    // TooltipCellRendererComponent,

    AngularMaterialModule,
    DynamicPanelBodyModule,
    AgGridModule.withComponents([])
  ],
  declarations: [SummonerSpellsComponent]
})
export class SummonerSpellsModule { }
