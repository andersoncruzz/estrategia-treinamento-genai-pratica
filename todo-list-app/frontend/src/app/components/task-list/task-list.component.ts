import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  priorityFilter: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  markAsCompleted(task: Task): void {
    task.status = 'COMPLETED'; // Assuming 'COMPLETED' is a valid status in the Status enum
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  filterByPriority(): void {
    if (this.priorityFilter) {
      this.filteredTasks = this.tasks.filter(task => task.priority === this.priorityFilter);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
}