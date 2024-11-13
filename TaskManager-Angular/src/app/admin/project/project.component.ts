import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  
  @Input("currentProject") project: Project | any;
  @Input("recordIndex") i: number = 0;
  hideDetails: boolean = false;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor()
  {
  }

  ngOnInit()
  {
  }

  onEditClick(event: any, i: number)
  {
    this.editClick.emit({ event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({ event, i});
  }
  toggleDetails()
  {
    this.hideDetails=!this.hideDetails;
  }
}