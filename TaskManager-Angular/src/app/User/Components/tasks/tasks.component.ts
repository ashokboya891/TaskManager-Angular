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
  
  taskGroups: GroupedTask[] = [];

  constructor(private tasksService: TasksService, public loginService: LoginService)
  {
  }

  ngOnInit()
  {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
    });
  }
}
