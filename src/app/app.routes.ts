import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { EmployeesComponent } from './employees/employees.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { TaskComponent } from './tasks/task/task.component';

export const routes: Routes = [
  {
    path: 'features',
    component: FeaturesComponent,
  },

  {
    path: 'employees',
    component: EmployeesComponent,
  },

  {
    path: 'newEmployee',
    component: EmployeeComponent,
  },

  {
    path: 'employee/:employeeId',
    component: EmployeeComponent,
  },

  {
    path: 'tasks',
    component: TasksComponent,
  },

  {
    path: 'newTask',
    component: TaskComponent,
  },
  {
    path: 'task/:taskId',
    component: TaskComponent,
  }
];
