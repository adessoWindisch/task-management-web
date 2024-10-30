import { Component, OnDestroy } from '@angular/core';
import { Task } from './task/task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeesService } from '../employees/employees.service';
import {
  BehaviorSubject,
  forkJoin,
  map,
  mergeMap,
  Observable,
  onErrorResumeNext,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnDestroy {
  dataSource: Observable<Task[]>;
  displayedColumns: string[] = [
    'taskId',
    'employeeName',
    'type',
    'status',
    'priority',
    'description',
    'startDate',
    'endDate',
    'done',
    'edit',
    'delete',
  ];

  employeeNames: Observable<Map<number, string>>; // Ein Objekt zum Speichern der geladenen Namen
  private updateTaskListTrigger = new BehaviorSubject(true); // Löst einen reload der Tasks und Employess aus
  private destroy = new Subject<true>();

  constructor(
    private taskService: TasksService,
    private employeeService: EmployeesService,
    private router: Router
  ) {
    // Liste aller Tasks
    // Benötigt kein takeUntil(this.destroy) weil die async pipe sich um das abräumen der Subscription kümmert
    this.dataSource = this.updateTaskListTrigger.pipe(
      switchMap(() => this.taskService.getTasks())
    );

    // Mitarbeiter abhängig zu den aktuellen Tasks
    // Benötigt kein takeUntil(this.destroy) weil die async pipe sich um das abräumen der Subscription kümmert
    this.employeeNames = this.dataSource.pipe(
      // extrahiere eine Liste von employee id's aus den aktuellen tasks
      map((tasks) =>
        tasks
          .map((task) => task.employeeId)
          // filter alle doppelten ids und id´s mit 0
          .filter((id, index, ids) => !ids.includes(id, index + 1) && id > 0)
      ),
      mergeMap((ids) => {
        // erstelle eine liste von requests, einen pro id um die Mitarbeiter abzufragen
        const employees = ids.map((id) => this.employeeService.getEmployee(id));
        // requests werden nacheinander abgearbeitet
        return forkJoin(employees);
      }),
      map(
        (employees) =>
          // Erstellen einer Map mit id und Namen des Mitarbeiters
          new Map(
            employees.map((employee) => [
              employee.employeeId,
              `${employee.firstName} ${employee.lastName}`,
            ])
          )
      ),
      shareReplay()
    );
  }

  // Trigger um alle subscriptions abzuräumen
  ngOnDestroy(): void {
    this.destroy.next(true);
  }

  editTask(taskId: number) {
    console.log(`Editing task with ID: ${taskId}`);
    this.router.navigate(['task', taskId]);
  }

  deleteTask(taskId: number) {
    this.taskService
      .deleteTask(taskId)
      // Abräumen der subscription wenn Komponente abgeräumt wird
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          console.log(`Deleting task with ID: ${taskId}`);
          console.log(res);
          this.updateTaskListTrigger.next(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  // Neue Methode zum Setzen des Status auf DONE
  setTaskStatusToDone(taskId: number) {
    this.taskService
      .updateTaskStatus(taskId, 'DONE')
      // Abräumen der subscription wenn Komponente abgeräumt wird
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          console.log(`Task with ID: ${taskId} set to DONE`);
          this.updateTaskListTrigger.next(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
