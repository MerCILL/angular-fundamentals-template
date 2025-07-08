import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required]]
    });
  }
  
  // Custom email validator for reactive forms
  emailValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { emailValidator: { value: control.value } };
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      // Handle form submission
    }
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}