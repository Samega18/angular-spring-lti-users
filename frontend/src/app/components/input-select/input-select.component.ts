import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent {

  @Input() tabIndex = 1;
  @Input() option1 = 'Nome';
  @Input() option2 = 'Username';
  @Input() checked = 1;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();

  changeValue = (value: string) =>{
    this.eventClick.emit(value);

  }

}
