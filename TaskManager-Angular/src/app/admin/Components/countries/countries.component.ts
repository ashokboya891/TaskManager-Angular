import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/Models/country';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { CountriesService } from 'src/app/Services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent  implements OnInit{

  // message: string | null = null;

    //Objects for Holding Model Data
    countries: Country[] = [];
    showLoading: boolean = false;
  
    //Objects for Delete
    deleteCountry: Country = new Country();
    editIndex: number | any = null;
    deleteIndex: number | any = null;
  
    //Properties for Searching
    searchBy: string = "countryName";
    searchText: string = "";
  
    //Properties for Paging
    currentPageIndex: number = 0;
    pages: any[] = [];
    pageSize: number = 7;
  
    //Reactive Forms
    newForm: FormGroup | any = null;
    editForm: FormGroup | any = null;
  
    //Autofocus TextBoxes
    @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef | any = null;
    @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef | any = null;
  
     //Sorting
  sortBy: string = "countryName";
  sortOrder: string = "ASC"; //ASC | DESC
    //Constructor
    constructor(private countriesService: CountriesService, private formBuilder: FormBuilder) {
    }
  
    ngOnInit() {
      //Get data from database
      this.countriesService.getCountries().subscribe(
        (response: Country[]) => {
          this.countries = response;
          this.showLoading = false;
          this.calculateNoOfPages();
        }
      );
  
      //Create newForm
      this.newForm = this.formBuilder.group({
        countryID: this.formBuilder.control(null),
        countryName: this.formBuilder.control(null, [Validators.required])
      });
  
      //Create editForm
      this.editForm = this.formBuilder.group({
        countryID: this.formBuilder.control(null),
        countryName: this.formBuilder.control(null, [Validators.required])
      });
    }
  
    calculateNoOfPages() {
      //Get no. of Pages
      let filterPipe = new FilterPipe();
      var noOfPages = Math.ceil(filterPipe.transform(this.countries, this.searchBy, this.searchText).length / this.pageSize);
      this.pages = [];
  
      //Generate pages
      for (let i = 0; i < noOfPages; i++) {
        this.pages.push({ pageIndex: i });
      }
  
      this.currentPageIndex = 0;
    }
  
    onPageIndexClicked(ind: number) {
      //Set currentPageIndex
      if (ind >= 0 && ind < this.pages.length) {
        this.currentPageIndex = ind;
      }
    }
  
    onNewClick(event: any) {
      // Reset the newForm without setting countryID
      this.newForm.reset();
      setTimeout(() => {
        // Focus the ClientLocation textbox in newForm
        this.defaultTextBox_New.nativeElement.focus();
      }, 100);
    }
    onSaveClick() {
  if (this.newForm.valid) {
    const newCountry = {
      countryName: this.newForm.value.countryName, // Only send countryName
    };

    // Invoke the REST-API call
    this.countriesService.insertCountry(newCountry).subscribe(
      (response) => {
        // Add Response to Grid
        const p: Country = new Country();
        p.countryName = response.countryName;
        this.countries.push(p);

        // Reset the newForm
        this.newForm.reset();
        $("#newCountryFormCancel").trigger("click");
        this.calculateNoOfPages();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

    
    // onSaveClick() {
    //   if (this.newForm.valid) {
    //     //Invoke the REST-API call
    //     this.countriesService.insertCountry(this.newForm.value).subscribe((response) => {
    //       //Add Response to Grid
    //       var p: Country = new Country();
    //       p.countryName = response.countryName;
    //       this.countries.push(p);
  
    //       //Reset the newForm
    //       this.newForm.reset();
    //       $("#newCountryFormCancel").trigger("click");
    //       this.calculateNoOfPages();
  
    //     }, (error) => {
    //       console.log(error);
    //     });
    //   }
    // }
  
    onEditClick(event: any, country: Country) {
      //Reset the editForm
      this.editForm.reset();
  
      setTimeout(() => {
        //Set data into editForm
        this.editForm.patchValue(country);
        this.editIndex = this.countries.indexOf(country);
  
        //Focus the ClientLocation textbox in editForm
        this.defaultTextBox_Edit.nativeElement.focus();
      }, 100);
    }
  
    onUpdateClick() {
      if (this.editForm.valid) {
        //Invoke the REST-API call
        this.countriesService.updateCountry(this.editForm.value).subscribe((response: Country) => {
          //Update the response in Grid
          this.countries[this.editIndex] = response;
  
          //Reset the editForm
          this.editForm.reset();
          $("#editCountryFormCancel").trigger("click");
        },
          (error) => {
            console.log(error);
          });
      }
    }
  
    onDeleteClick(event: any, country: Country) {
      //Set data into deleteCountry
      this.deleteCountry.countryID = country.countryID;
      this.deleteCountry.countryName = country.countryName;
      this.deleteIndex = this.countries.indexOf(country);
    }
  
    onDeleteConfirmClick() {
      //Invoke the REST-API call
      this.countriesService.deleteCountry(this.deleteCountry.countryID).subscribe(
        (response) => {
          //Delete object in Grid
          this.countries.splice(this.deleteIndex, 1);
  
          //Clear deleteCountry
          this.deleteCountry.countryID = null;
          this.deleteCountry.countryName = null;
  
          this.calculateNoOfPages();
        },
        (error) => {
          console.log(error);
        });
    }
  
    onSearchTextChange(event: any) {
      //Recall the calculateNoOfPages
      this.calculateNoOfPages();
    }
}
