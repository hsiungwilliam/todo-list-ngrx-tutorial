import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { catchError, from, map, switchMap, of } from "rxjs";
import { loadTodos, loadTodosSuccess } from "./todos.actions";
import { loadTodosFailure } from "./todos.actions";

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.todoService.getTodos()).pipe(
          // Take the returned value and return a new success action contain
          map((todos) => loadTodosSuccess({ todos: todos})),
          // Or... if it erros return a new failure action containing the
          catchError((error) => of(loadTodosFailure({ error })))
        ))
    )
  )
}
