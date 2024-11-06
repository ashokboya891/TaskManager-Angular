export class RegisterViewModel {
    personName: any;
    email: string | any;
    phoneNumber: string | any;
    dateOfBirth: string | any;
    password: string | any;
    gender: string | any;
    countryID: number | any;
    receiveNewsLetters: boolean | any;
    skills: any;

    constructor(personName: any = null,
        email: string | any = null,
        phoneNumber: string | any = null,
        dateOfBirth: string | any = null,
        password: string | any = null,
        gender: string | any = null,
        countryID: number | any = null,
        receiveNewsLetters: boolean = false,
        skills: any = null,)
    {
        this.personName = personName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
        this.countryID = countryID;
        this.receiveNewsLetters = receiveNewsLetters;
        this.skills = skills;
    }
}