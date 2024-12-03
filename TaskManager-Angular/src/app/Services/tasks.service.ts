import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

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
}
