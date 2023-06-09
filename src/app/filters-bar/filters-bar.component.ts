import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRequest } from '../table/table.component';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filterText, sortNumerical, sortOrdinal } from '../utils/filters';

interface Option {
  value: string;
  name: string;
}

export interface Filter {
  name: string;
  value: string;
  filterType: 'numerical' | 'ordinal' | 'text';
  isActive: boolean;
  options?: Option[];
  selectedOption?: Option;
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
      name: 'Status',
      value: 'status',
      filterType: 'ordinal',
      isActive: true,
      options: [
        { value: 'all', name: 'All status' },
        { value: 'pending', name: 'Pending' },
        { value: 'solved', name: 'Solved' },
        { value: 'open', name: 'Open' },
      ],
      selectedOption: { value: 'all', name: 'All status' },
    },
    {
      name: 'Customer Satisfaction',
      value: 'customerSatisfaction',
      filterType: 'numerical',
      isActive: false,
      options: [
        { value: 'high', name: 'Higher first' },
        { value: 'low', name: 'Lower first' },
      ],
      selectedOption: { value: '', name: '' },
    },
    {
      name: 'Priority',
      value: 'priority',
      filterType: 'ordinal',
      isActive: false,
      options: [
        { value: 'all', name: 'All priorities' },
        { value: 'low', name: 'Low' },
        { value: 'medium', name: 'Medium' },
        { value: 'high', name: 'High' },
      ],
      selectedOption: { value: 'all', name: 'All priorities' },
    },
    {
      name: 'Filter by text',
      filterType: 'text',
      value: 'text',
      isActive: false,
    },
  ];

  query: string = '';

  @Input() filteredData: UserRequest[] = [];
  @Input() completeData: UserRequest[] = [];
  @Output() filteredDataChange = new EventEmitter<UserRequest[]>();

  filterDidChange() {
    this.filteredData = this.completeData;
    this.filters.forEach((filter) => {
      if (filter.isActive && filter.selectedOption?.value !== 'all') {
        if (filter.filterType === 'ordinal') {
          this.filteredData = sortOrdinal(this.filteredData, filter);
        } else if (filter.filterType === 'numerical') {
          this.filteredData = sortNumerical(this.filteredData, filter);
        } else {
          this.filteredData = filterText(this.filteredData, this.query);
        }
      }
    });
    this.filteredDataChange.emit(this.filteredData);
  }

  inputChanged(e: Event) {
    this.query = (e.target as HTMLInputElement).value;
    this.filterDidChange();
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
        filter.selectedOption = { value: '', name: '' };
      }
    });
    this.filterDidChange();
  }
}
