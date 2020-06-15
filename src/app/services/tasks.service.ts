import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ITask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  created_at: string;
  updated_at: string;
  tags_ids: string[];
  priority_id: string;
  created_by_user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  public getTaskById(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`${environment.apiUrl}/tasks/${taskId}`);
  }

  public getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.apiUrl}/tasks`);
  }

  public createTask(task: Partial<ITask>) {
    return this.http.post<ITask>(`${environment.apiUrl}/tasks`, {...task});
  }

  public updateTask(taskId: string, task: Partial<ITask>): Observable<ITask> {
    delete task._id;
    return this.http.put<ITask>(`${environment.apiUrl}/tasks/${taskId}`, {...task});
  }

  public deleteTask(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.apiUrl}/tasks/${taskId}`);
  }
}
