import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, catchError } from 'rxjs/operators';
import { ProjectsService } from '../Services/projects.service';
import { Project } from '../Models/project';

@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ProjectIDUniqueValidatorDirective, multi: true }]
})
export class ProjectIDUniqueValidatorDirective implements AsyncValidator {
  constructor(private projectsService: ProjectsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // Return null immediately if control value is empty
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(300), // Wait for 300ms pause in events before validating
      switchMap(value => 
        this.projectsService.getProjectByProjectID(value).pipe(
          map((existingProject: Project | null) => {
            // If project exists, return an error object
            return existingProject ? { uniqueProjectID: { valid: false } } : null;
          }),
          catchError(() => of(null)) // Handle errors and return null
        )
      )
    );
  }
}
