import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputEdit', {static: true}) txtInputEdit: ElementRef;

  checkCompleted: FormControl;
  txtInput: FormControl;
  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.editando = false;
    this.checkCompleted = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required);

    this.checkCompleted.valueChanges.subscribe( value => {
      this.store.dispatch(actions.toogle({ id: this.todo.id }));
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputEdit.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if( this.txtInput.invalid) { return; }
    if( this.txtInput.value === this.todo.texto) { return; }
    this.store.dispatch(actions.editar( {id: this.todo.id, texto: this.txtInput.value} ))
  }

  borrar() {
    this.store.dispatch(actions.borrar( {id: this.todo.id} ))
  }
}
