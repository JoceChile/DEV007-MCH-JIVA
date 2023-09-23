import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterOption: string | null = null;

  setFilterOption(option: string) {
    this.filterOption = option;
  }

  getFilterOption() {
    return this.filterOption;
  }
}
