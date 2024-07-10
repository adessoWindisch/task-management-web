import { Component, OnInit } from '@angular/core';
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
import { Task, Status, Type, Priority } from './task.model';
import { TasksService } from '../tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Employee } from '../../employees/employee/employee.model';
import { EmployeesService } from '../../employees/employees.service';

@Component({
  selector: 'app-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    MatDatepickerModule,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  task: Task = {
    taskId: 0,
    employeeId: 0,
    type: Type.DEVELOPMENT,
    status: Status.OPEN,
    priority: Priority.MEDIUM,
    description: '',
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString()
  };
  isNewTask: boolean = true;

  employees: Employee[] = [];

  constructor(
    private taskService: TasksService,
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    this.getEmployeeList();
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskService.getTask(Number(taskId)).subscribe(
        {
          next: (res: Task) => {
            this.task = res;
            console.log(res);
            this.isNewTask = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isNewTask = true;
          }
        }
      );
    }

    console.log(new Date().toLocaleDateString());



  }

  private formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind nullbasiert
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveTask(taskForm: NgForm): void {
    console.log(`Saving task with data:`);
    console.log(this.task);
    this.task.startDate = this.formatDateToYYYYMMDD(new Date(this.task.startDate));
    this.task.endDate = this.formatDateToYYYYMMDD(new Date(this.task.endDate));
    console.log(this.task);


    if (this.task.taskId) {
      this.taskService.updateTask(this.task).subscribe(
        {
          next: (res: Task) => {
            console.log(`Task updated:`);
            console.log(res);
            taskForm.resetForm();
            this.snackBar.open('Task successfully updated!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/tasks']);
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
      this.taskService.saveTask(this.task).subscribe(
        {
          next: (res: Task) => {
            console.log(`Task saved:`);
            console.log(res);
            taskForm.resetForm();
            this.snackBar.open('Task successfully saved!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/tasks']);
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

  myFilter = (d: Date | null): boolean => {
    if (!this.task.startDate) {
      return true; // Allow all dates if no start date is set
    }

    const date = d || new Date();
    console.log("date: " + date);
    console.log("startdate: " + this.task.startDate);

    return true;
  };

  private getEmployeeList(): void {
    console.log("Loading employees for task creation...");
    this.employeeService.getEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          this.employees = res;
          console.log("Employees loaded for task creation:");
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
