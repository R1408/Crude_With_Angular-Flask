import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable}  from 'rxjs';
import { ApisService } from '../common/apis.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApisService,private router: Router, private route: ActivatedRoute) { }

  titleAlert: string = 'This field is required';
  categoryName: string;
  id: any;
  
  post: any = '';
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  formGroup= this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern(this.emailregex)], this.checkInUseEmail],
    password: [null, [Validators.required, this.checkPassword]]
  })
  hide = true;


  ngOnInit(): void {
    this.getUser()
  }

  /**
   * get Users
   */
  async getUser() {
    this.id = this.route.snapshot.paramMap.get('id')
    let response = await <any> new Promise((resolve, reject) => {
      this.apiService.getOne(this.id).subscribe((data) => resolve(data))
    })
    let userDetails = response.data
    this.formGroup= this.fb.group({
      first_name: [userDetails['first_name'], Validators.required],
      last_name: [userDetails['last_name'], Validators.required],
      email: [userDetails['email'], [Validators.required, Validators.pattern(this.emailregex)], this.checkInUseEmail],
      password: [userDetails['password'], [Validators.required, this.checkPassword]]
    })
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter, one lowercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter, one lowercase letter and one number' : '';
 }

  async onSubmit() {
    let response = await <any> new Promise((resolve, reject) => {
       this.apiService.put(this.id, JSON.stringify(this.formGroup.value)).subscribe((data) => resolve(data))
    })
    this.router.navigate(['/displayUsers'])
  }

}
