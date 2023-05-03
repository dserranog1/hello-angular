import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

export interface UserRequest {
  name: string;
  subject: string;
  customerSatisfaction: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Solved' | 'Open' | 'Pending';
}

function createRandomRequests(n: number) {
  let requests: UserRequest[] = [];
  for (let i = 0; i < n; i++) {
    requests.push(createSingleRequest());
  }
  return requests;
}

function createSingleRequest(): UserRequest {
  return {
    name: faker.name.fullName(),
    subject: faker.lorem.sentence(),
    customerSatisfaction: faker.datatype.number({ min: 0, max: 100 }),
    priority: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
    status: faker.helpers.arrayElement(['Solved', 'Open', 'Pending']),
  };
}

const ELEMENT_DATA: UserRequest[] = createRandomRequests(200);

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  completeData = ELEMENT_DATA;
  filteredData = ELEMENT_DATA;
  displayedColumns: string[] = [
    'userName',
    'subject',
    'customerSatisfaction',
    'priority',
    'status',
  ];
  getImageColor(priority: 'High' | 'Medium' | 'Low'): string {
    const imgSrc: { High: string; Medium: string; Low: string } = {
      High: '#ff8800',
      Medium: '#fffb00',
      Low: '#838383',
    };
    return imgSrc[priority];
  }
}
