import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/Services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  
  @Input("currentProject") project: Project | any;
  @Input("recordIndex") i: number = 0;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  MySubscription:Subscription|any;
  hideDetails: boolean = false;
  constructor(public projectService: ProjectsService) 
  {

  }


  ngOnInit()
  {
     this.MySubscription= this.projectService.MySubject.subscribe((hide:any) => {
      this.hideDetails = hide;
    });
  }

  onEditClick(event: any, i: number)
  {
    this.editClick.emit({ event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({ event, i});
  }
  ngOnDestory()
  {
    this.MySubscription.unsubscribe();
  }
  //only one property will be picked
  @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent | any = null;

  isAllCheckedChange(b: boolean)
  {
    if (b)
    {
      this.selectionBox.check();
    }
    else
    {
      this.selectionBox.unCheck();
    }
  }
}