import { Component } from '@angular/core';
import { Task } from './task/task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeesService } from '../employees/employees.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DatePipe, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  dataSource: Task[] = [];
  displayedColumns: string[] = [
    'taskId',
    'employeeName',
    'startDate',
    'endDate',
    'edit',
    'delete'
  ];

  employeeNames: { [key: number]: string } = {}; // Ein Objekt zum Speichern der geladenen Namen


  constructor(private taskService: TasksService, private employeeService: EmployeesService, private router: Router) {
    this.getTaskList();
  }

  private getTaskList(): void {
    this.taskService.getTasks().subscribe(
      {
        next: (res: Task[]) => {
          this.dataSource = res;
          console.log(res);
          this.getAllEmployees();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  editTask(taskId: number) {
    console.log(`Editing task with ID: ${taskId}`);
    this.router.navigate(['task', taskId]);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(
      {
        next: (res) => {
          console.log(`Deleting task with ID: ${taskId}`);
          console.log(res);
          this.getTaskList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  getEmployeeName(employeeId: number): string {
    if (this.employeeNames[employeeId] && this.employeeNames[employeeId].length > 0) {
      console.log(`Employee found for ID: ${employeeId} is ${this.employeeNames[employeeId]}`);

      return this.employeeNames[employeeId];
    }
    else {
      console.log(`Employee not found for ID: ${employeeId}`);
      return "...";
    }
  }

  private getAllEmployees(): void {
    this.dataSource.forEach(task => {
      this.getEmployee(task.employeeId);
    });
  }

  private getEmployee(employeeId: number): string {
    if (!this.employeeNames[employeeId] || this.employeeNames[employeeId].length <= 0) {
      this.employeeService.getEmployee(employeeId).subscribe(
        {
          next: (res) => {
            console.log(`Employee name for ID: ${employeeId} is ${res.firstName} ${res.lastName}`);
            this.employeeNames[employeeId] = `${res.firstName} ${res.lastName}`;
            return this.employeeNames[employeeId];
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            return '';
          }
        }
      );
    }
    return '';
  }
}
