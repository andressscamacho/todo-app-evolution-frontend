import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { IPriority } from 'src/app/services/priorities.service';
import { PrioritiesService } from '../../services/priorities.service';

export interface ITaskEditDialogParams {
  _id: string;
}

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.css'],
})
export class DialogEditTaskComponent implements OnInit {
  priorities: Observable<IPriority[]>;

  datetimeEnableMeridian = true;

  editTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    due_date: new FormControl(''),
    priority_id: new FormControl(''),
    completed: new FormControl(false)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private params: ITaskEditDialogParams,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private tasksService: TasksService,
    private prioritiesService: PrioritiesService
  ) {}

  ngOnInit(): void {
    this.priorities = this.prioritiesService.getPriorities();

    this.tasksService.getTaskById(this.params._id).subscribe((foundTask) => {
      this.editTaskForm.patchValue({ ...foundTask });
    });
  }

  public toggleTaskCompletion() {
    this.tasksService.updateTask(this.params._id, {completed: !this.editTaskForm.value.completed}).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  public updateTask() {
    const taskNewFields = {
      ...this.editTaskForm.value
    };

    this.tasksService.updateTask(this.params._id, taskNewFields).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  public deleteTask() {
    this.tasksService.deleteTask(this.params._id).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
