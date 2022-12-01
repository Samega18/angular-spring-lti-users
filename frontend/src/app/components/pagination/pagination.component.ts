import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserPage } from 'src/app/types/types-data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() pageNumber = 0;
  @Input() totalPages = 0;
  @Input() pageFirst = true;
  @Input() pageLast = true;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();


  onChange = (value: number) =>{
    this.pageNumber = value;
    this.eventClick.emit(value);
  }

}
