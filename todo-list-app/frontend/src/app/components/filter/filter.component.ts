import { Component, EventEmitter, Output } from '@angular/core';
import { Priority } from '../../models/task.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<Priority>();
  
  selectedPriority: Priority | null = null;

  onFilterChange(priority: Priority) {
    this.selectedPriority = priority;
    this.filterChange.emit(this.selectedPriority);
  }
}