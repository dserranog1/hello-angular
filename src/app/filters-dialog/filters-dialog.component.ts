import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filter } from '../filters-bar/filters-bar.component';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.scss'],
})
export class FiltersDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public filters: Filter[]) {}
  selected: Filter | '' = '';
  handleAddFilter() {
    if (this.selected) {
      this.selected.isActive = true;
    }
  }
}
