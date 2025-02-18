import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { ComponentLoaderDirective } from 'src/app/Directives/component-loader.directive';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent  implements OnInit {
  masterMenuItems = [
    { itemName: "Countries", displayName: "Countries", component: CountriesComponent },
    { itemName: "ClientLocations", displayName: "Client Locations", component: ClientLocationsComponent },
    { itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent },
    { itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent },
  ];

  activeItem: string = "";
  tabs: any[] = [];

  @ViewChildren(ComponentLoaderDirective) componentLoaders: QueryList<ComponentLoaderDirective> | any = null;
//FOR EVERY NEW OBJ IT WILL CREATE NEW CONTAINER REFERENCES FOR EVERY CLICK 
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  menuItemClick(clickedMasterMenuItem: any) {
    //console.log(clickedMasterMenuItem);
    this.activeItem = clickedMasterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab) => {
      return tab.itemName == clickedMasterMenuItem.itemName
    });

    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });

      setTimeout(() => {
        var componentLoadersArray = this.componentLoaders.toArray();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);

        var viewContainterRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;
        

        var componentRef = viewContainterRef.createComponent(componentFactory);

        if (clickedMasterMenuItem.component.name == "CountriesComponent") {
          var componentInstance = componentRef.instance as CountriesComponent;
          // componentInstance.message = "Hello to Countries";
        }
      }, 100);
    }

  }
  onCloseClick(clickedTab: any) {
    console.log(clickedTab);
    
    if (clickedTab.viewContainerRef) {
      clickedTab.viewContainerRef.remove();
    } else {
      console.warn('viewContainerRef is undefined for the clicked tab.');
    }
    
    this.tabs.splice(this.tabs.indexOf(clickedTab), 1);
    
    if (this.tabs.length > 0) {
      this.activeItem = this.tabs[0].itemName;
    }
  }
  
  // onCloseClick(clickedTab: any) {
  //   console.log(clickedTab)
  //   clickedTab.viewContainerRef.remove();
  //   this.tabs.splice(this.tabs.indexOf(clickedTab), 1);
  //   if (this.tabs.length > 0) {
  //     this.activeItem = this.tabs[0].itemName;
  //   }
  // }
}