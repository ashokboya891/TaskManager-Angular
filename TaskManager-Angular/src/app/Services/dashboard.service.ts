import { Injectable } from '@angular/core';
 var baseUrl="https://localhost:7018/api/Projects";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { 

  }

  getTeamMembers():any[]{
    var TeamMembers=[
      {Region: 'North',
        Members: [
           {Name:"latha madhuri",Status:"Avaialable",ID:1},
          {Name:"naina",Status:"Busy",ID:2},
           {Name:"raya ",Status:"Avaialable",ID:3},
           {Name:"asok kin",Status:"Avaialable",ID:4},

        ]
      },
      {Region: 'East',
        Members: [
           {Name:"joshi paul",Status:"Avaialable",ID:1},
          {Name:"naina",Status:"Avaialable",ID:2},
           {Name:"raya ",Status:"Avaialable",ID:3},
           {Name:"asok kin",Status:"Busy",ID:4},
        ]
      },
      {Region: 'West',
        Members: [
          {Name:"sudha raga",Status:"Busy",ID:1},
          {Name:"naina",Status:"Avaialable",ID:2},
           {Name:"raya ",Status:"Avaialable",ID:3},
           {Name:"asok kin",Status:"Busy",ID:4},
        ]
      },
      {Region: 'South',
          Members: [
            {Name:"ashi khana",Status:"Avaialable",ID:1},
            {Name:"raya ",Status:"Avaialable",ID:2},
           {Name:"asok kin",Status:"Busy",ID:3},
           {Name:"rahul ",Status:"Busy",ID:4},

        ]
      },
    ]
    return TeamMembers;
  }
  getTeamMembersSummary(): any[] {
    var TeamMembersSummary = [
      {
        Region: 'East',
        TeamMembersCount: 20,
        TemporarilyUnavailableMembers: 4,
      },
      {
        Region: 'West',
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 8,
      },
      {
        Region: 'South',
        TeamMembersCount: 17,
        TemporarilyUnavailableMembers: 1,
      },
      {
        Region: 'North',
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 6,
      },
    ];
    return TeamMembersSummary;
  }
  getClients():any[]{
    var clients=[
       "Ashok Solutions","King Archites","Royal villas","Manu Builders"
    ]
    return clients;
    }
  
  getProjects():any[]{
  var projects=[
       "Project A","BasF Solutions","Nestle Global","Vircho Pharma","Appolo Automations"

  ]
  return projects;
  }
  getYears():any[]{
    var years=[    
        2019,2022,2020,2024,2023    
    ]
    return years;
  }
}
