import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponentComponent } from './table-component/table-component.component';


const routes: Routes = [
  {
    path: 'table',
    component: TableComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
