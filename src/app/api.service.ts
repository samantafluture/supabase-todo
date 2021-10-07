import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  supabaseUrl = 'https://uwqwbmgpmwnuqtxtnuax.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzU1Njc4NywiZXhwIjoxOTQ5MTMyNzg3fQ.6GfOz84yTlemFfZnL4BWEyF2BmC5iYjqkYslaXO8yRw';
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async addTodo(todo: Todo) {
    const { data, error } = await this.supabase
      .from<Todo>('todos')
      .insert(todo);

    return { data, error };
  }

  async getTodos() {
    const { data, error } = await this.supabase
      .from<Todo>('todos')
      .select('*')
      .limit(10);

    return { data, error };
  }

  async updateTodo(todo: Todo) {
    const { data, error } = await this.supabase
      .from<Todo>('todos')
      .update(todo)
      .match({ id: todo.id });

    return { data, error };
  }

  async deleteTodo(todo: Todo) {
    const { data, error } = await this.supabase
      .from<Todo>('todos')
      .delete()
      .match({ id: todo.id });

    return { data, error };
  }
}
