import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from '../country';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup | any = null;
  genders = ["male", "female"];
  countries: Country[] = []

  constructor(private countriesService: CountriesService)
  {
  }

  ngOnInit()
  {
    this.countries = this.countriesService.getCountries();

    this.signUpForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      mobile: new FormControl(null),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null),
      countryID: new FormControl(null),
      receiveNewsLetters: new FormControl(true),
    });
    this.signUpForm.valueChanges.subscribe((value: any) =>
      {
        console.log(value);
      });
  }
}