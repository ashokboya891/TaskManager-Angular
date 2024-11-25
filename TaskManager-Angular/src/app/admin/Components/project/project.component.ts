import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Models/project';
import { ProjectsService } from 'src/app/Services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  @Input("currentProject") project: Project | any;
  @Input("recordIndex") i: number = 0;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  MySubscription:Subscription|any;
  hideDetails: boolean = false;
  constructor(public projectService: ProjectsService) 
  {

  }
  // ngOnChanges(simpleChanges: SimpleChanges)
  // {
  //   console.info("--------------ngOnChanges called");

  //   for (let propName in simpleChanges)
  //   {
  //     let chng = simpleChanges[propName];
  //     let cur = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }

  //   if (simpleChanges["project"])
  //   {
  //     //this.project.teamSize += 1;
  //   }
  // }
  // ngDoCheck()
  // {
  //   console.info("--------------ngDoCheck called");
  // }

  // ngAfterContentInit()
  // {
  //   console.info("--------------ngAfterContentInit called");
  //   console.log(this.selectionBoxes.toArray());
  // }

  // ngAfterContentChecked()
  // {
  //    console.info("--------------ngAfterContentChecked called");
  // }

  // ngAfterViewInit()
  // {
  //   console.info("--------------ngAfterViewInit called");
  //   // console.log(this.tbl);
  // }

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
    console.log(".............ngdestory implemented");
    this.MySubscription.unsubscribe();
  }
  // cotent child only one obj will be picked  //ContentChildren will pick multiple objs
  @ContentChildren("selectionBox") selectionBoxes:QueryList<CheckBoxPrinterComponent> | any = null;

  isAllCheckedChange(b: boolean)
  {
    let selectionBox = this.selectionBoxes.toArray();
    if (b)
    {
      for (let i = 0; i < selectionBox.length; i++)
      {
        selectionBox[i].check();
      }
    }
    else
    {
      for (let i = 0; i < selectionBox.length; i++)
      {
        selectionBox[i].unCheck();
      }
    }
  }
}