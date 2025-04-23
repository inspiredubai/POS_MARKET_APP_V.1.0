import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DashboardComponent } from '../dashboard.component';
import { PopoveroptionComponent } from './popoveroption/popoveroption.component';
 
const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'popoveroption',
    component:  PopoveroptionComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
