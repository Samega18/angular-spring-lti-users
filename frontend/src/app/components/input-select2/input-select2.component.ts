import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-select2',
  templateUrl: './input-select2.component.html',
  styleUrls: ['./input-select2.component.css']
})
export class InputSelect2Component {

  @Input() label = 'ROLE_ADMIN'
  @Input() tabIndex = 1;
  @Input() option1 = 'Nome';
  @Input() option2 = 'Username';
  @Input() checked = 1;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();

  changeValue = (value: string) =>{
    this.label = value;
    this.eventClick.emit(value);
  }

}
