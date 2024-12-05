import { Component } from '@angular/core';
import { GroupedTask } from 'src/app/Models/group-task';
import { LoginService } from 'src/app/Services/login.service';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  taskGroups: GroupedTask[] | undefined;

  constructor(private tasksService: TasksService, public loginService: LoginService)
  {
  }

  ngOnInit() {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
      console.log(this.taskGroups); // Check the structure and data
    });
  }
  



  getTaskGroupBgCssClass(taskStatusName: string | null | undefined): string {
    const status = taskStatusName ?? 'Holding';  // Default value for null or undefined
    let className = '';
    switch (status) {
      case 'Holding': className = 'bg-secondary text-white'; break;
      case 'Prioritized': className = 'bg-primary text-white'; break;
      case 'Started': className = 'bg-info text-white'; break;
      case 'Finished': className = 'bg-success text-white'; break;
      case 'Reverted': className = 'bg-danger text-white'; break;
      default: className = 'bg-default'; break;
    }
    return className;
  }

  getTaskPriorityBadgeCssClass(taskPriorityName: string | null | undefined): string {
    const priority = taskPriorityName ?? 'Normal'; // Default value for null or undefined
    let className = '';
    switch (priority) {
      case 'Urgent': className = 'badge-danger'; break;
      case 'Normal': className = 'badge-primary'; break;
      case 'Below Normal': className = 'badge-info'; break;
      case 'Low': className = 'badge-secondary'; break;
      default: className = 'badge-default'; break;
    }
    return className;
  }

  getTaskGroupTextCssClass(taskStatusName: string | null | undefined): string {
    const status = taskStatusName ?? 'Holding';  // Default value for null or undefined
    let className = '';
    switch (status) {
      case 'Holding': className = 'text-secondary'; break;
      case 'Prioritized': className = 'text-primary'; break;
      case 'Started': className = 'text-info'; break;
      case 'Finished': className = 'text-success'; break;
      case 'Reverted': className = 'text-danger'; break;
      default: className = 'text-default'; break;
    }
    return className;
  }
}