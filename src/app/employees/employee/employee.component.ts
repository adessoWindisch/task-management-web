import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { Employee } from './employee.model';
import { EmployeesService } from '../employees.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatDividerModule,
    MatGridListModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  @Input({ required: true }) employeeId!: string;

  employee: Employee = {
    employeeId: 0,
    orgId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  };
  isNewEmployee: boolean = true;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    console.log(`Constructor-Employee ID: ${this.employeeId}`);

  }
  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      this.employeeService.getEmployee(Number(employeeId)).subscribe(
        {
          next: (res: Employee) => {
            this.employee = res;
            console.log(res);
            this.isNewEmployee = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isNewEmployee = true;
          }
        }
      );
    }
    console.log(`OnInt-Employee ID: ${this.employeeId}`);
  }

  saveEmployee(employeeForm: NgForm): void {
    console.log(`Saving employee with data:`);
    console.log(this.employee);

    if (this.employee.employeeId) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(`Employee updated:`);
            console.log(res);
            employeeForm.resetForm();
            this.snackBar.open('Employee successfully updated!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/employees']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.snackBar.open('Error during updating!', 'Close', {
              duration: 3000,
            });
          }
        }
      );
    }
    else {
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(`Employee saved:`);
            console.log(res);
            employeeForm.resetForm();
            this.snackBar.open('Employee successfully saved!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/employees']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.snackBar.open('Error during saving!', 'Close', {
              duration: 3000,
            });
          }
        }
      );
    }
  }
}

