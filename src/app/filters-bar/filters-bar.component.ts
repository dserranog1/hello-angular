import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRequest } from '../table/table.component';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Filter {
  name: string;
  value: string;
  type: string;
  isActive: boolean;
}

export interface NewFilters {
  customerSatisfaction: {
    name: 'Customer Satisfaction';
    value: 'customerSatisfaction';
    isActive: boolean;
  };
  priority: {
    name: 'Priority';
    value: 'priority';
    isActive: boolean;
  };
  text: {
    name: 'Filter by text';
    value: 'text';
    isActive: boolean;
  };
}

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent {
  constructor(public dialog: MatDialog) {}

  filters: Filter[] = [
    {
      name: 'Customer Satisfaction',
      value: 'customerSatisfaction',
      type: 'select',
      isActive: false,
    },
    {
      name: 'Priority',
      value: 'priority',
      type: 'select',
      isActive: true,
    },
    {
      name: 'Filter by text',
      type: 'text',
      value: 'text',
      isActive: true,
    },
  ];

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

  checkIfInactiveFilters() {
    return !this.filters.some((filter) => !filter.isActive);
  }

  openDialog() {
    this.dialog.open(FiltersDialogComponent, { data: this.filters });
  }

  disableFilter(filter: Filter) {
    this.filters.forEach((item) => {
      if (item.name === filter.name) {
        // could add ID property for a safer approach
        filter.isActive = false;
      }
    });
  }
}
