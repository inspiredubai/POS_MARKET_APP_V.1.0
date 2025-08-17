import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopoveroptionComponent } from './popoveroption/popoveroption.component';
import { HomePage } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'popoveroption',
    component: PopoveroptionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
