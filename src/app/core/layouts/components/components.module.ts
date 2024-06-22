import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent
  ],
  exports: [
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    AngularMaterialModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ComponentsModule { }
