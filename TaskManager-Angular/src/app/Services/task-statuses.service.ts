import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus } from '../Models/task-status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService {

  constructor(private httpClient: HttpClient)
  {
  }

  getTaskStatuses(): Observable<TaskStatus[]>
  {
    return this.httpClient.get<TaskStatus[]>("https://localhost:7018/api/taskstatuses", { responseType: "json" });
  }

  getTaskStatusByTaskStatusID(TaskStatusID: number): Observable<TaskStatus>
  {
    return this.httpClient.get<TaskStatus>("https://localhost:7018/api/taskstatuses/searchbytaskstatusid/" + TaskStatusID, { responseType: "json" });
  }

  insertTaskStatus(newTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.post<TaskStatus>("https://localhost:7018/api/taskstatuses", newTaskStatus, { responseType: "json" });
  }

  updateTaskStatus(existingTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.put<TaskStatus>("https://localhost:7018/api/taskstatuses", existingTaskStatus, { responseType: "json" });
  }

  deleteTaskStatus(TaskStatusID: number): Observable<string>
  {
    return this.httpClient.delete<string>("https://localhost:7018/api/taskstatuses?TaskStatusID=" + TaskStatusID);
  }
}
