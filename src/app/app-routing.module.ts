import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintsListComponent } from './complaints-list/complaints-list.component';
import { ComplaintsDetailComponent } from './complaints-detail/complaints-detail.component';
import { ComplaintsDashboardComponent } from './complaints-dashboard/complaints-dashboard.component';

const routes: Routes = [
  {path: "", redirectTo: "/complaints", pathMatch: "full"},
  {path: "complaints", component: ComplaintsListComponent},
  {path: "complaints/:id", component: ComplaintsDetailComponent},
  {path: "dashboard", component: ComplaintsDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouterComponent = [ComplaintsListComponent, ComplaintsDetailComponent, ComplaintsDashboardComponent];
