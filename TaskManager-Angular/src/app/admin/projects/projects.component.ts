import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationService } from 'src/app/client-location.service';
import { NotificationService } from 'src/app/NotificationService';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/Services/projects.service';
import * as $ from "jquery";
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {


  projects:Project[] =[];

  clientLocations: ClientLocation[] = [];
 showLoading: boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: any = null;
  deleteProject: Project = new Project();
  deleteIndex: any = null;
  searchBy: string = 'ProjectName';
  searchText: string = '';
  
  @ViewChild("newForm") newForm: NgForm | any = null;
  @ViewChild("editForm") editForm: NgForm | any = null;
  constructor(private projectService:ProjectsService,private clientLocationService:ClientLocationService,private notificationService:NotificationService) {
  
  }
  @ViewChildren("prj") prj!: QueryList<ProjectComponent>;

  ngAfterViewInit() {
    setTimeout(() => {
      console.log("Project components:", this.prj.toArray()); // Verify all components are initialized
    });
   }

  onHideShowDetails(event: any) {
    this.projectService.toggleDetails();

    // const projs = this.prj.toArray();
    // projs.forEach((proj) => {
    //   proj.toggleDetails(); // Toggle details in each ProjectComponent
    //   console.log(proj);     // Log each component to verify
    // });
  }
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((opt:Project[])=>{
      this.projects=opt,
      this.showLoading=false;
    });
    this.clientLocationService.getClientLocations().subscribe(
      (response:any) =>
      {
        this.clientLocations = response;
        
      }
    );
  }
  refresh()
  {
    this.ngOnInit();
  }
  onNewClick(event: any)
  {
    this.newForm.resetForm();
    // this.newForm=true;
  }

  onSaveClick() {
    if(this.newForm.valid)
    {

    
    const selectedClientLocation = this.clientLocations.find(cl => cl.clientLocationID === Number(this.newProject.clientLocationID));
    console.log("selected Location:", selectedClientLocation?.clientLocationName);
    
    if (selectedClientLocation) {
      // Set the clientLocation properties based on the selected location
      this.newProject.clientLocation = {
        clientLocationID: selectedClientLocation.clientLocationID,
        clientLocationName: selectedClientLocation.clientLocationName
      };
    } else {
      console.error("Selected client location is not found!");
      return; // Stop execution if client location is not found
    }
  
    console.log("Saving project:", this.newProject);
  
    // Call the service to insert the new project
    this.projectService.insertProjects(this.newProject).subscribe((response: Project) => {
      // Create a new Project object with the response data
      this.notificationService.showSuccess("Inserted successfully..!")

      var p: Project = new Project();
      p.projectID = response.projectID;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      p.clientLocation = response.clientLocation; // Make sure this contains the correct data
      p.active = response.active;
      p.clientLocationID = response.clientLocationID;
      p.status = response.status;
  
      // Add the new project to the projects array
      this.projects.push(p);
  
      // Clear New Project Dialog - Resetting to a new instance
      this.newProject = new Project(); 
      $("#newFormCancel").trigger("click");

    }, (error) => {
      if (error.error && error.error.message) {
        this.notificationService.showError(error.error.message);
      } else {
        // Fallback for unexpected errors
        this.notificationService.showError('An unexpected error occurred.');
      }
    });
  }
  }


  onEditClick(event: any, index: number)
  {
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-"); //yyyy-MM-dd
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.active = this.projects[index].active;
    this.editProject.clientLocationID = this.projects[index].clientLocationID;
    this.editProject.clientLocation = this.projects[index].clientLocation;
    this.editProject.status = this.projects[index].status;
    this.editIndex = index;
  }
 
  onUpdateClick() {
    console.log(this.editProject)
    this.projectService.updateProject(this.editProject).subscribe(
      (response: Project) => {
       this.notificationService.showInfo("updated..!")

        // Assuming the response contains the updated project data
        if (response && response.projectID) {
          // Update the local project list with the new data
          this.projects[this.editIndex] = response; // Use the response directly

          //$('#editModal').modal('hide');
        } else {
          console.error('Response does not contain expected project data:', response);
        }
  
        // Clear the edit form fields
        this.editProject = new Project(); // Resetting to a new Project instance
        this.editIndex = null; // Clear the edit index
        $("#editFormCancel").trigger("click");

      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  onDeleteClick(event: any, index: number)
  {
    console.log(index+"from delete utton");
    this.notificationService.showWarning("are you sure..!")
    
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }

  onDeleteConfirmClick()
  {
    console.log(this.deleteProject.projectID+"confirm delete");
    this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) =>
      {

        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = null;
        this.deleteProject.projectName = null;
        this.deleteProject.teamSize = null;
        this.deleteProject.dateOfStart = null;
      },
      (error) =>
      {
        console.log(error);
      });
  }
  onSearchClick()
  {
    console.log(this.searchBy+"-"+this.searchText)
    this.projectService
      .SearchProjects(this.searchBy, this.searchText)
      .subscribe(
        (response: Project[]) =>
        {
          this.projects = response;
        },
        (error) =>
        {
          console.log(error);
        }
      );
  }


  // @ViewChildren("prj") prj : QueryList<ProjectComponent> | any;

  // onHideShowDetails(event: any)
  // {
  //   let projs = this.prj.toArray();
  //   for (var i = 0; i < projs.length; i++)
  //   {
  //     projs[i].toggleDetails();
  //     console.log([projs[i]]);
  //   }
  // }
}
