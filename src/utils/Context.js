"use strict";

export function Key(project, collection) {
  return project + "-" + collection;
}

export function Add(project, collection, data) {
  let key = Key(project, collection);
  return {
    key: data,
  };
}

export function Unwrap(context) {
  return context.data;
}

export function Get(project, collection, context) {
  return context[Key(project, collection)];
}

export function Merge(context1, context2) {
  let newContext = {};
  for (let key in context1) {
    newContext[key] = context1[key];
  }
  for (let key in context2) {
    newContext[key] = context2[key];
  }
  return newContext;
}
