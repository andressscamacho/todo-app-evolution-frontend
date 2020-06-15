import { Component, OnInit } from '@angular/core';
import { IPriority, PrioritiesService } from 'src/app/services/priorities.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.sass']
})
export class DialogCreateTaskComponent implements OnInit {
  priorities: Observable<IPriority[]>;

  datetimeEnableMeridian = true;

  createTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    due_date: new FormControl(''),
    priority_id: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private tasksService: TasksService,
    private prioritiesService: PrioritiesService
  ) {}

  ngOnInit(): void {
    this.priorities = this.prioritiesService.getPriorities();
  }

  public createTask() {
    const taskNewFields = {
      ...this.createTaskForm.value
    };

    this.tasksService.createTask(taskNewFields).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
