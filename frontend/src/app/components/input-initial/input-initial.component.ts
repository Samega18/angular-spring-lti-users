import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-initial',
  templateUrl: './input-initial.component.html',
  styleUrls: ['./input-initial.component.css']
})
export class InputInitialComponent {

  @Input() label = '';
  @Input() iconName = '';
  @Input() placeHolder = '';
  @Input() typeInput = 'text';
  @Input() valueData = '';
  @Input() mmEnabled = false;
  @Input() disabledValue = false;
  @Input() min = 2;
  @Input() max = 100;

  colorPl = "#E1E1E6";
  focus = false;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  @Output() onKeyEnter: EventEmitter<string> = new EventEmitter();

  update(value: string) {

    if(this.mmEnabled){

      if(value.length <= this.min){
        this.colorPl = "red";
      } else{
        this.colorPl = "#E1E1E6";
      }

      this.valueChanged.emit(value);

    }else{
      this.valueData = value;

      this.valueChanged.emit(value);
    }

  }

  enterPress = () =>{
    this.onKeyEnter.emit();
  }

}
