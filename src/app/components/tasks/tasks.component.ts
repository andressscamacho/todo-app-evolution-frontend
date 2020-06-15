import { Component, OnInit } from '@angular/core';
import { TasksService, ITask } from '../../services/tasks.service';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
import { DialogCreateTaskComponent } from '../dialog-create-task/dialog-create-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  pendingTasks: Observable<ITask[]>;
  completedTasks: Observable<ITask[]>;

  constructor(
    private tasksService: TasksService,
    private dialogManager: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    const allTasks = this.tasksService.getTasks();
    this.pendingTasks = allTasks.pipe(map(tasks => tasks.filter(task => !task.completed)));
    this.completedTasks = allTasks.pipe(map(tasks => tasks.filter(task => task.completed)));
  }

  openTaskCreateDialog() {
    const dialogRef = this.dialogManager.open(DialogCreateTaskComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.getAllTasks();
    });
  }

  openTaskDetailDialog(taskId: string) {
    const dialogRef = this.dialogManager.open(DialogEditTaskComponent, {
      width: '400px',
      data: { _id: taskId },
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.getAllTasks();
    });
  }
}
