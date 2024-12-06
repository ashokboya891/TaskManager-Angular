import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskStatusDetail } from '../Models/task';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/User';
import { GroupedTask } from '../Models/group-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getTasks() : Observable<GroupedTask[]>
  {
    
    return this.httpClient.get<GroupedTask[]>("https://localhost:7018/api/tasks", { responseType: "json" });
  }


  insertTask(newTask: Task): Observable<Task | null> {  // Updated return type to include null
    const user = JSON.parse(sessionStorage['currentUser']);  // Get the current user from session storage
    newTask.createdBy = user.id;  // Add the current user's ID to the task

    // Log the task object for debugging
    console.log('Inserting task:', newTask);

    return this.httpClient.post<Task>('https://localhost:7018/api/createtask', newTask, { responseType: 'json' })
      .pipe(
        catchError(error => {
          console.error('Error occurred while creating task:', error);
          // Return null or handle the error as needed
          return of(null);  // Return null in case of an error
        })
      );
  }


  getTaskByTaskID(TaskID: number): Observable<Task> {
    return this.httpClient.get<Task>("https://localhost:7018/api/tasks/searchbytaskid/" + TaskID, { responseType: "json" });
  }

  updateTaskStatus(taskStatusDetail: TaskStatusDetail): Observable<TaskStatusDetail> {
    var user = JSON.parse(sessionStorage["currentUser"]);
    //console.log(user);
    taskStatusDetail.userID = user.id; //add this statement to store the current user's id in the 'taskStatusDetails' table

    return this.httpClient.put<TaskStatusDetail>("https://localhost:7018/api/updatetaskstatus", taskStatusDetail, { responseType: "json" });
  }

 
}
