import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.css']
})
export class ButtonIconComponent {

  @Input() iconName = '';
  @Output() eventClick: EventEmitter<any> = new EventEmitter();

  onClick = () =>{
    this.eventClick.emit();
  }

}
