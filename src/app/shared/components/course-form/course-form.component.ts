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
  courseForm: FormGroup;
  submitted = false;
  availableAuthors: Author[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' }
  ];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    
    // Инициализируем форму в конструкторе
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      duration: ['', [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        author: ['', [Validators.minLength(2), this.latinLettersAndNumbersValidator.bind(this)]]
      })
    });
  }

  ngOnInit() {
    // Дополнительная логика инициализации, если нужна
  }

  // Custom validator for latin letters and numbers
  latinLettersAndNumbersValidator(control: FormControl) {
    if (!control.value) {
      return null;
    }
    const pattern = /^[a-zA-Z0-9\s]+$/;
    return pattern.test(control.value) ? null : { latinLettersAndNumbers: true };
  }

  // Добавляем геттер для newAuthor группы
  get newAuthorGroup() {
    return this.courseForm.get('newAuthor') as FormGroup;
  }

  // Добавляем геттер для author контрола
  get authorControl() {
    return this.courseForm.get('newAuthor.author') as FormControl;
  }

  get authorsFormArray(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): Author[] {
    return this.authorsFormArray.controls.map(control => control.value);
  }

  get availableAuthorsFiltered(): Author[] {
    const courseAuthorIds = this.courseAuthors.map(author => author.id);
    return this.availableAuthors.filter(author => !courseAuthorIds.includes(author.id));
  }

  addAuthor(author: Author) {
    this.authorsFormArray.push(this.fb.control(author));
  }

  removeAuthor(index: number) {
    this.authorsFormArray.removeAt(index);
  }

  createAuthor() {
    const newAuthorControl = this.courseForm.get('newAuthor.author');
    const newAuthorName = newAuthorControl?.value;
    
    if (newAuthorName && newAuthorControl?.valid) {
      const newAuthor: Author = {
        id: Date.now().toString(),
        name: newAuthorName
      };
      
      this.availableAuthors.push(newAuthor);
      newAuthorControl.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log('Form submitted:', this.courseForm.value);
      // Handle form submission
    }
  }
}