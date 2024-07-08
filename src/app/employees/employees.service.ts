import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:8080/api/v1/employees"

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.api}`, employee);
  }

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.api}`);
  }

  public deleteEmployee(employeeId: number) {
    return this.httpClient.delete(`${this.api}/${employeeId}`);
  }

  public getEmployee(employeeId: number) {
    return this.httpClient.get<Employee>(`${this.api}/${employeeId}`);
  }

  public updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(`${this.api}`, employee);
  }
}
