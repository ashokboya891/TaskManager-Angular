import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/Models/project';
import { TaskPriority } from 'src/app/Models/TaskPriority';
import { LoginService } from 'src/app/Services/login.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { TaskPrioritiesService } from 'src/app/Services/task-priorities.service';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  newTaskForm!: FormGroup;  // Use definite assignment operator "!"
  projects!: Observable<Project[]>;  // Use definite assignment operator "!"
  employees!: Observable<any>;  // Use definite assignment operator "!"
  taskPriorities!: Observable<TaskPriority[]>;  // Use definite assignment operator "!"
  submitted: boolean = false;  // Track form submission state

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private projectsService: ProjectsService,
    private taskPrioritiesService: TaskPrioritiesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Initialize the form group with validation
    this.newTaskForm = new FormGroup({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
      taskPriorityID: new FormControl(2, [Validators.required]),
      taskStatus: new FormControl('Holding', [])  // Initialize with default status "Holding"
    });

    // Fetch data for dropdowns
    this.projects = this.projectsService.getProjects();
    this.employees = this.loginService.getAllEmployes();
    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
  }

  // Handle form submission
  onCreateTaskClick(): void {
    this.submitted = true; // Set the flag when the form is submitted
    
    // If the form is valid, send the data to the service
    if (this.newTaskForm.valid) {
      this.tasksService.insertTask(this.newTaskForm.value).subscribe(
        () => {
          // Navigate to the task list page upon successful task creation
          this.router.navigate(['/User', 'tasks']);
        },
        (error) => {
          // Handle any error that occurs during the task creation process
          console.error('Error creating task', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}