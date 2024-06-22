import { Routes, RouterModule } from '@angular/router';
import { ChampionsListComponent } from './champions-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    component: ChampionsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionsListRoutes { }


