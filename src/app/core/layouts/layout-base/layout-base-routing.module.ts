
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ChampionsListComponent } from 'src/app/pages/champions-list/champions-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'champions-list',
    component: ChampionsListComponent,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('../../../pages/champions-list/champions-list.module').then(
            (m) => m.ChampionsListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutBaseRoutingModule { }
