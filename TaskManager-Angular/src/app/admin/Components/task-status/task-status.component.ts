import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/Models/task-status';
import { TaskPriority } from 'src/app/Models/TaskPriority';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { TaskPrioritiesService } from 'src/app/Services/task-priorities.service';
import { TaskStatusesService } from 'src/app/Services/task-statuses.service';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  
  taskStatuses: TaskStatus[] = [];
  showLoading: boolean = true;

  //Objects for Delete
  deleteTaskStatus: TaskStatus = new TaskStatus();
  editIndex: number |any;
  deleteIndex: number |any;
  //Properties for Searching
  searchBy: string = "taskStatusName";
  searchText: string = "";


  //Properties for Paging
  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  //Properties for Sorting
  sortBy: string = "taskStatusName";
  sortOrder: string = "ASC";

  //Reactive Forms
  newForm: FormGroup|any;
  editForm: FormGroup|any;

  //Autofocus TextBoxes
  @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef|any;
  @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef|any;

  //Constructor
  constructor(private taskStatusesService: TaskStatusesService, private formBuilder: FormBuilder)
  {
  }

  ngOnInit()
  {
    //Get data from database
    this.taskStatusesService.getTaskStatuses().subscribe(
      (response: TaskStatus[]) =>
      {
        this.taskStatuses = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages()
  {
    //Get no. of Pages
    let filterPipe = new FilterPipe();
    var noOfPages = Math.ceil(filterPipe.transform(this.taskStatuses, this.searchBy, this.searchText).length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let i = 0; i < noOfPages; i++)
    {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(ind:any)
  {
    //Set currentPageIndex
    if (ind >= 0 && ind < this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(event:any)
  {
    //reset the newForm
    this.newForm.reset({ taskStatusID: 0 });
    setTimeout(() =>
    {
      //Focus the TaskStatus textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick()
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusesService.insertTaskStatus(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        var p: TaskStatus = new TaskStatus();
        p.taskStatusID = response.taskStatusID;
        p.taskStatusName = response.taskStatusName;
        this.taskStatuses.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newTaskStatusFormCancel").trigger("click");
        this.calculateNoOfPages();

        this.calculateNoOfPages();
      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick(event:any, taskStatus: TaskStatus)
  {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() =>
    {
      this.editForm.patchValue(taskStatus);
      this.editIndex = this.taskStatuses.indexOf(taskStatus);

      //Focus the TaskStatus textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick()
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusesService.updateTaskStatus(this.editForm.value).subscribe((response: TaskStatus) =>
      {
        //Update the response in Grid
        this.taskStatuses[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editTaskStatusFormCancel").trigger("click");
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(event:any, taskStatus: TaskStatus)
  {
    //Set data into deleteTaskStatus
    this.deleteTaskStatus.taskStatusID = taskStatus.taskStatusID;
    this.deleteTaskStatus.taskStatusName = taskStatus.taskStatusName;
    this.deleteIndex = this.taskStatuses.indexOf(taskStatus);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.taskStatusesService.deleteTaskStatus(this.deleteTaskStatus.taskStatusID).subscribe(
      (response) =>
      {
        //Delete object in Grid
        this.taskStatuses.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskStatus.taskStatusID = null;
        this.deleteTaskStatus.taskStatusName = null;

        //Recall the calculateNoOfPages
        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      });
  }

  onSearchTextChange(event:any)
  {
    this.calculateNoOfPages();
  }
}