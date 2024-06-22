import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './core/layouts/layout-base/layout-base.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/core/layouts/layout-base/layout-base.module').then(
            (m) => m.LayoutBaseModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
