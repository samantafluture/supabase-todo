import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todo: Todo;
  todos: Todo[];
  actionLabel: string;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.clear();
    this.api.getTodos().then((payload) => {
      this.todos = payload.data;
    });
  }

  clear() {
    this.todo = new Todo();
    this.actionLabel = 'ADD';
  }

  addTodo() {
    if (this.todo.id) {
      this.updateTodo();
      return;
    }
    this.api.addTodo(this.todo).then((payload) => {
      this.todos.push(payload.data[0]);
      this.clear();
    });
  }

  selectTodo(todo: Todo) {
    this.todo = todo;
    this.actionLabel = 'UPDATE';
  }

  updateTodo() {
    this.api.updateTodo(this.todo).then(() => {
      let index = this.todos.findIndex((t) => t.id == this.todo.id);
      this.todos[index] = this.todo;
      this.clear();
    });
  }

  checkTodo(todo: Todo) {
    this.todo = todo;
    this.todo.isDone = !todo.isDone;
    this.updateTodo();
  }

  // remove element using filter function
  arrayRemove(array: Todo[], id: string) {
    return array.filter((element) => element.id != id);
  }

  deleteTodo(todo: Todo) {
    this.api.deleteTodo(todo).then((data) => {
      this.todos = this.arrayRemove(this.todos, todo.id);
    });
  }
}
