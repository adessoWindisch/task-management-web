import { Component } from '@angular/core';
import { Employee } from './employee/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeesService } from './employees.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  dataSource: Employee[] = [];
  displayedColumns: string[] = [
    'employeeId',
    'orgId',
    'firstName',
    'lastName',
    'email',
    'mobileNumber',
    'edit',
    'delete'
];

  constructor(private employeeService: EmployeesService, private router: Router) {
    this.getEmployeeList();
  }

  private getEmployeeList(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          this.dataSource = res;
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  editEmployee(employeeId: number) {
    console.log(`Editing employee with ID: ${employeeId}`);
    this.router.navigate(['employee', employeeId]);
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (res) => {
          console.log(`Deleting employee with ID: ${employeeId}`);
          console.log(res);
          this.getEmployeeList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
