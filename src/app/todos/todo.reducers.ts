import { Todo } from './models/todo.model';
import { crear, toogle, editar, borrar, toogleAll, eliminarCompletados } from './todo.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState:Todo[] = [
  new Todo('Salvar mundo'),
  new Todo('Salvar mundo 1'),
  new Todo('Salvar mundo 2'),
  new Todo('Salvar mundo 3'),
];

const _todoReducer = createReducer( initialState,
  on(crear, (state, { texto }) => [...state, new Todo( texto )]),
  on(toogle, (state, { id }) => {
    return state.map( todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, {id, texto}) => {
    return state.map(todo => {
      if( todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, {id}) => state.filter(todo => todo.id !== id )),

  on(toogleAll, (state, {completado}) => {
    return state.map( todo => {
      return {
        ...todo,
        completado: completado
      }
    });
  }),

  on(eliminarCompletados, state => {
    return state.filter( todo => !todo.completado );
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
