import { Filter } from '../filters-bar/filters-bar.component';
import { UserRequest } from '../table/table.component';

function sortRequests(a: UserRequest, b: UserRequest): number {
  if (a.customerSatisfaction < b.customerSatisfaction) {
    return -1;
  }
  if (a.customerSatisfaction > b.customerSatisfaction) {
    return 1;
  }
  return 0;
}

export const sortOrdinal = (data: UserRequest[], filter: Filter) => {
  return data.filter((item) => {
    const currentProperty = item[filter.value as keyof UserRequest];
    if (typeof currentProperty === 'string') {
      return currentProperty.toLowerCase() === filter.selectedOption?.value;
    }
    return true;
  });
};

export const sortNumerical = (data: UserRequest[], filter: Filter) => {
  if (filter.selectedOption?.value === 'low') {
    return [...data].sort(sortRequests);
  } else if (filter.selectedOption?.value === 'high') {
    return [...data].sort(sortRequests).reverse();
  }
  return data;
};

export const filterText = (data: UserRequest[], query: string) => {
  return data.filter((item) => {
    let nameAndSubject = item.name + item.subject;
    return nameAndSubject.toLowerCase().includes(query.toLowerCase());
  });
};
