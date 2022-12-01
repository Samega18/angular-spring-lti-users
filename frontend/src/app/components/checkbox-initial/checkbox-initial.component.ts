import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-initial',
  templateUrl: './checkbox-initial.component.html',
  styleUrls: ['./checkbox-initial.component.css']
})
export class CheckboxInitialComponent {
  @Input() label = '';
}
