import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit 
{

    Designation: string = "";
    Username: string = "";
    NoOfTeamMembers: number = 0;
    TotalCostOfAllProjects: number = 0;
    PendingTasks: number = 0;
    UpComingProjects: number = 0;
    ProjectCost: number = 0;
    CurrentExpenditure: number = 0;
    AvailableFunds: number = 0;
    ToDay:Date | undefined;
    Clients: string[] = [];
    Projects: string[] = [];
    Years: number[] = [];
    TeamMembersSummary: any = [];
    TeamMembers: any = [];
   constructor(private dashboardservice:DashboardService) {
    
   }
    ngOnInit()
    {
      this.Designation = 'Team Leader';
      this.Username = 'Scott Smith';
      this.NoOfTeamMembers = 67;
      this.TotalCostOfAllProjects = 240;
      this.PendingTasks = 15;
      this.UpComingProjects = 0.7;
      this.ProjectCost = 2113507;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds = 52536;
      this.ToDay=new Date();
      this.Clients=this.dashboardservice.getClients();
      this.Projects=this.dashboardservice.getProjects();
      this.Years=this.dashboardservice.getYears();
    
      this.TeamMembers=this.dashboardservice.getTeamMembers();

      this.TeamMembersSummary=this.dashboardservice.getTeamMembersSummary();
    }
    onProjectChange($event:any)
    {
      console.log($event.target.innerHTML);
      if ($event.target.innerHTML.trim() == 'BasF Solutions')
      {
        this.ProjectCost = 2123507;
        this.CurrentExpenditure = 96788;
        this.AvailableFunds = 52436;
      }
      else if ($event.target.innerHTML.trim() == 'Project A')
        {
          this.ProjectCost = 21235507;
          this.CurrentExpenditure = 296788;
          this.AvailableFunds = 552436;
        }
      else if ($event.target.innerHTML.trim() == 'Nestle Global')
      {
        this.ProjectCost = 88923;
        this.CurrentExpenditure = 22450;
        this.AvailableFunds = 2640;
      }
      else if($event.target.innerHTML.trim() == 'Vircho Pharma')
      {
        this.ProjectCost = 662183;
        this.CurrentExpenditure = 7721;
        this.AvailableFunds = 9811;
      }
      else if($event.target.innerHTML.trim() == 'Appolo Automations')
      {
        this.ProjectCost = 928431;
        this.CurrentExpenditure = 562;
        this.AvailableFunds = 883;
      }

    }
  
}
