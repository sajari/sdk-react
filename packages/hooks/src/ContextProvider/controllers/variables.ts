/* eslint-disable no-underscore-dangle */
import { defaultConfig } from '../config';
import { EVENT_VALUES_UPDATED } from '../events';
import { Listener, ListenerMap } from './listener';

export type VariableFn = () => string;
export type VariablesMap = Map<string, string | string[] | number | boolean | VariableFn>;
export interface VariablesObject {
  [k: string]: string | string[] | number | boolean | VariableFn | undefined;
}
export type CallbackFn = (variables: VariablesObject, set: (variables: VariablesObject) => void) => void;

export class Variables {
  private variables: VariablesMap;

  private listeners: ListenerMap;

  /**
   * Constructor for Variables object.
   * @param variables Initial variables.
   */
  constructor(variables: { [k: string]: string | string[] | number | boolean | VariableFn } = {}) {
    this.listeners = new Map([[EVENT_VALUES_UPDATED, new Listener()]]);
    this.variables = new Map(
      Object.entries({
        [defaultConfig.qParam]: '',
        [defaultConfig.resultsPerPageParam]: 15,
        filter: '_id != ""',
        ...variables,
      }),
    );
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   */
  public listen(event: string, callback: CallbackFn) {
    if (event !== EVENT_VALUES_UPDATED) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Merge variables into the variable map.
   *
   * Set a variable to undefined to remove it.
   */
  public set(variables: VariablesObject) {
    this._set(variables);
    this._emitUpdated(variables);
  }

  /**
   * get returns the current variables.
   */
  public get(): { [k: string]: string } {
    const variables = {} as { [k: string]: string };

    this.variables.forEach((variable, key) => {
      if (typeof variable === 'function') {
        variables[key] = (variable as VariableFn)();
      } else if (Array.isArray(variable)) {
        variables[key] = (variable as string[]).join(',');
      } else {
        variables[key] = String(variable);
      }
    });
    return variables;
  }

  /**
   * Emits an event to notify listener that the variables have been updated.
   *
   * @private
   */
  private _emitUpdated(changes: VariablesObject) {
    (this.listeners.get(EVENT_VALUES_UPDATED) as Listener).notify((listener) =>
      listener(changes, (variables: VariablesObject) => this._set(variables)),
    );
  }

  /**
   * Sets variables without triggering an event, internal use only.
   */
  private _set(variables: VariablesObject) {
    Object.keys(variables).forEach((key) => {
      if (variables[key] === undefined) {
        this.variables.delete(key);
      } else {
        this.variables.set(key, variables[key] as string | VariableFn);
      }
    });
  }
}
