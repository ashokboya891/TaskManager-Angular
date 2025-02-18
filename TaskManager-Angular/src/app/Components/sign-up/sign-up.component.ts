import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../Models/country';
import { CountriesService } from '../../Services/countries.service';
import { CustomValidatorsService } from '../../Services/custom-validators.service';
import { LoginService } from '../../Services/login.service';
import { RegisterViewModel } from '../../Models/register-view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup | any = null;
  genders = ["male", "female"];
  countries: Country[] = [];
  registerError: string | null = null;

  canLeave: boolean = true;

  constructor(private countriesService: CountriesService,private formBuilder:FormBuilder,private customValidatorService:CustomValidatorsService
    ,private loginService:LoginService,private router:Router
  )
  {
  }

  ngOnInit()
  {
     this.countriesService.getCountries().subscribe((resp)=>{
      this.countries=resp;
    });

   
    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(2)]],
        lastName: [null, [Validators.required, Validators.minLength(2)]],
      }),
      email: [null, [Validators.required, Validators.email],[this.customValidatorService.DuplicateEmailValidator()]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[7896]\d{9}$/)]],
      dateOfBirth: [null, [Validators.required,this.customValidatorService.minimumAgeValidator(18)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
      receiveNewsLetters: [null],
      skills: this.formBuilder.array([])
    },{
      validators: [
        this.customValidatorService.compareValidator("confirmPassword", "password")
      ],
    
    });
    this.signUpForm.valueChanges.subscribe((value: any) =>
      {
        this.canLeave = false;
        //console.log(value);
      });
      
  }
  onSubmitClick()
  {
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);
    //Display current form value
    //console.log(this.signUpForm.value);

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    //this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);

    if (this.signUpForm.valid)
    {
      var signUpViewModel = this.signUpForm.value as RegisterViewModel;
      this.loginService.Register(signUpViewModel).subscribe(
        (response) =>
        {
          this.canLeave = true;
          localStorage["token"] = response.token;
          this.router.navigate(["tasks"]);
        },
        (error) =>
        {
          console.log(error);
          this.registerError = "Unable to submit";
        });
      }
    }
  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      skillLevel: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }

}