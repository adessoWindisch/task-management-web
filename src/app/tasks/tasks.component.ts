import { Component } from '@angular/core';
import { Task } from './task/task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  dataSource: Task[] = [];
  displayedColumns: string[] = [
    'taskId',
    'employeeId',
    'type',
    'status',
    'priority',
    'description',
    'startDate',
    'endDate',
    'actions'
];

  constructor(private taskService: TasksService) {
    this.getTaskList();
  }

  private getTaskList(): void {
    this.taskService.getTasks().subscribe(
      {
        next: (res: Task[]) => {
          this.dataSource = res;
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
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
}
