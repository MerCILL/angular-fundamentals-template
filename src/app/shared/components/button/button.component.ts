import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText: string = 'Button';
   @Input() iconName?: IconProp;
}
