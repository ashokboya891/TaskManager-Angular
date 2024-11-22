import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
export interface CanComponentDeactivate
{
  canLeave: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CanDeactiveGuardService implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(component: CanComponentDeactivate)
  {
    if (component.canLeave == true)
    {
      return true; //user can leave the current route
    }
    else
    {
      return confirm("Do you want to discard changes?");
    }
  }
}