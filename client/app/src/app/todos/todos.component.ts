import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todos/todo.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  
  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);
  
  members: string[] = this.todoService.getMembers();
  todos = this.todoService.getTodos();
  router = inject(Router);

  private subscription : Subscription | null = null;

  todos$ = this.todoService.loadTodos();
  selectedMemberId: string | null = null;

  ngOnInit(): void {
    this.subscription = this.route.firstChild
      ? this.route.firstChild.params.subscribe(params => {
          this.selectedMemberId = params['member'];
      })
      : null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
