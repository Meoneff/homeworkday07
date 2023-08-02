import { createAction, props } from "@ngrx/store";

export const enterNumber = createAction(
    '[Calculator] Enter Number',
    props<{ number: string }>()
);

export const enterOperator = createAction(
    '[Calculator] Enter Operator',
    props<{ operator: string }>()
);

