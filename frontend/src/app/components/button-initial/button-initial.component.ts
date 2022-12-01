import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-initial',
  templateUrl: './button-initial.component.html',
  styleUrls: ['./button-initial.component.css']
})
export class ButtonInitialComponent {

  @Input() placeHolder = '';
  @Input() colorRed = false;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();

  onClick = () =>{
    this.eventClick.emit();
  }

}
