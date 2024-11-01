import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from "@angular/common/http";
import { Project } from '../project';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NotificationService } from '../NotificationService';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url:string="https://localhost:7018";

  jsonUrl:string="http://localhost:3000/projects";
  
  constructor(private httpclient:HttpClient,private notificationService: NotificationService ) { }

  getProjects(): Observable<Project[]> {
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);headers: headers,

    return this.httpclient
      .get<Project[]>(`${this.url}/api/Projects`, {responseType: "json" })
      .pipe(
        map((data: Project[]) => {
          this.notificationService.showSuccess('Authenticated user..!')
          return data;
        }),
        // catchError(error => {
          
        //   // Show a popup notification with the error
        //   this.notificationService.showError('Aurhentication Failed . Please try login again .');
        //   // Log the error or handle it as needed
        //   return throwError(error); // Rethrow the error to propagate it
        // })
      );
  }
  getProjectByProjectID(ProjectID: number): Observable<Project>
  {
    return this.httpclient.get<Project>(this.url + "/api/Projects/api/projects/searchbyprojectid/" + ProjectID, { responseType: "json" });
  }
  // getProjectByProjectID(ProjectID: number): Observable<Project>
  // {
  //   return this.httpclient.get<Project>(this.url + "/api/Projects/" + ProjectID, { responseType: "json" });
  // }
  
  insertProjects(newproject:Project):Observable<Project>{
    return this.httpclient.post<Project>(this.url+"/api/Projects",newproject,{responseType:"json"})
   }
   updateProject(existingProject: Project): Observable<Project>
  {
    console.log(existingProject.projectName)
    // let headers = new HttpHeaders();
    // headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    return this.httpclient.put<Project>(this.url + "/api/Projects/"+existingProject.projectID, existingProject, {responseType: "json" });
  }

  deleteProject(ProjectID: number): Observable<string>
  {
    console.log(ProjectID+"id in selete service");
    // let headers = new HttpHeaders();
    // headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    return this.httpclient.delete<string>(this.url + "/api/Projects/" + ProjectID);
  }
  SearchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    const params = new HttpParams()
      .set('searchBy', searchBy)
      .set('searchText', searchText);
  
    return this.httpclient.get<Project[]>(this.url + '/api/Projects/Search', { params });
  }
  
  // SearchProjects(searchBy:string,searchText:string):Observable<Project[]>{  
  //   return this.httpclient.get<Project[]>(
  //     this.url + '/api/Projects/Search?searchBy/' + searchBy + '/' + searchText,
     
  //   );

    // return this.httpclient.get<Project[]>(this.url+"/api/Projects/Search/"+searchBy+"/"+searchText)
  }
