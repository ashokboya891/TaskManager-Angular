import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSizeValidatorDirective } from '../Directives/team-size.directive';
import { ClientLocationStatusValidatorDirective } from '../Directives/client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../Directives/project-idunique-validator.directive';
import { NumberTowardsPipe } from '../Pipes/number-towards.pipe';
import { FilterPipe } from '../Pipes/filter.pipe';
import { PagingPipe } from '../Pipes/paging.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberTowardsPipe,
    FilterPipe,
    PagingPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberTowardsPipe,
    FilterPipe,
    PagingPipe
  ]
})
export class SharedModule { }