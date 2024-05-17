import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from '../../services/todos/todo.service';
import { Todo } from '../../types/todos';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {
  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);
  private subscription : Subscription | null = null;
  todos$ : Observable<Todo[]> | null = null;

  member!: string;

  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.todoForm = this.formBuilder.group({
      todo: ['', Validators.required],
      time: [Date, Validators.required]
      //TODO: Custom Validator for Time: Time > now
    });
  }

  
  get todo() {
    return this.todoForm.controls['todo'];
  }

  get time() {
    return this.todoForm.controls['time'];
  }

  formSubmitHandler(): void {
    if (this.todoForm.valid) {
      const val = this.todoForm.value;
      val["isDone"] = false;
      this.todoService.addTodoTo(this.member, val);
      this.router.navigate(['/todos']);
    } else {
      // Template itself doesn't allow to submit an invalid form so no need to handle this case (see submit button)
    }
  }

  navigateToTodosList(): void {
    this.router.navigate(['/todos']);
  }

  // @HostBinding('class.green-background') isGreenBackground = true;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.member = params['member']
    });
  }

  addTodoToMember(){
    this.todoService
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  


}
