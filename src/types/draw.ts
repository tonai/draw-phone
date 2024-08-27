export enum Action {
  ADD,
  DELETE,
  UPDATE,
}

export type AddAction = [Action.ADD, string, string, string]
export type DeleteAction = [Action.DELETE, string, string]
export type UpdateAction = [Action.UPDATE, string, string, string]

export type DiffAction = AddAction | DeleteAction | UpdateAction
