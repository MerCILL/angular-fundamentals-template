import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchForm') searchForm!: NgForm;
  
  searchValue: string = '';
  
  onSearch() {
    if (this.searchValue.trim()) {
      this.search.emit(this.searchValue);
    }
  }

}