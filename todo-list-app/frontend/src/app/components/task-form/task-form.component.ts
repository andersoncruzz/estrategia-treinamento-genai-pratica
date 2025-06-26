import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Status } from '../../enums/status.enum';
import { Priority } from '../../enums/priority.enum';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  statuses = Object.values(Status);
  priorities = Object.values(Priority);

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [Status.PENDING, Validators.required],
      priority: [Priority.LOW, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService.createTask(newTask).subscribe(response => {
        console.log('Task created:', response);
        this.taskForm.reset();
      });
    }
  }
}