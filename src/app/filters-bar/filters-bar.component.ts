import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRequest } from '../table/table.component';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent {
  @Input() filteredData: UserRequest[] = [];
  @Input() completeData: UserRequest[] = [];
  @Output() filteredDataChange = new EventEmitter<UserRequest[]>();
  selected: string = 'all';
  filterDidChange(filter: string) {
    if (filter === 'status') {
      if (this.selected === 'all')
        return this.filteredDataChange.emit(this.completeData);
      this.filteredData = this.completeData.filter(
        (item) => item.status.toLocaleLowerCase() === this.selected
      );
      this.filteredDataChange.emit(this.filteredData);
    }
  }
}
