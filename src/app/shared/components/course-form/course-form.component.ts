import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup; // Add definite assignment assertion
  submitted = false;
  availableAuthors: Author[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' }
  ];

  constructor(private fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.initForm(); // Initialize form in constructor
  }

  private initForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      duration: ['', [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), this.latinLettersAndNumbersValidator]]
      })
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  // Custom validator for latin letters and numbers
  latinLettersAndNumbersValidator(control: FormControl): {[key: string]: any} | null {
    if (!control.value) {
      return null;
    }
    const pattern = /^[a-zA-Z0-9\s]+$/;
    return pattern.test(control.value) ? null : { latinLettersAndNumbers: true };
  }

  get newAuthorGroup(): FormGroup {
    return this.courseForm.get('newAuthor') as FormGroup;
  }

  get authorControl(): FormControl {
    return this.newAuthorGroup.get('author') as FormControl;
  }

  get authorsFormArray(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): Author[] {
    return this.authorsFormArray.value;
  }

  get availableAuthorsFiltered(): Author[] {
    const courseAuthorIds = this.courseAuthors.map(author => author.id);
    return this.availableAuthors.filter(author => !courseAuthorIds.includes(author.id));
  }

  addAuthor(author: Author): void {
    if (author && author.id) {
      this.authorsFormArray.push(this.fb.control(author));
    }
  }

  removeAuthor(index: number): void {
    if (index >= 0 && index < this.authorsFormArray.length) {
      this.authorsFormArray.removeAt(index);
    }
  }

  createAuthor(): void {
    const authorName = this.authorControl.value;
    
    if (authorName && this.authorControl.valid) {
      const newAuthor: Author = {
        id: Date.now().toString(),
        name: authorName.trim()
      };
      
      this.availableAuthors.push(newAuthor);
      this.authorControl.reset();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      const formValue = {
        ...this.courseForm.value,
        authors: this.courseAuthors
      };
      console.log('Form submitted:', formValue);
      // Handle form submission
    }
  }

  // Helper method to patch form values (useful for testing)
  patchFormValue(value: any): void {
    this.courseForm.patchValue(value);
  }
}