import { Todo } from "./todos/models/todo.model";
import { ActionReducerMap } from '@ngrx/store';

import { todoReducer } from './todos/todo.reducers';
import { filtroReducer } from './filtro/filtro.reducers';

import { filtrosValidos } from './filtro/filtro.actions';

export interface AppState {
  todos: Todo[];
  filtro: filtrosValidos;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer
}
