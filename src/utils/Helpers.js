export class Sort {
  constructor(displayName, fieldName, ordering) {
    this.displayName = displayName;
    this.fieldName = fieldName;
    this.ordering = ordering;
  }

  raw() {
    return {
      displayName: this.displayName,
      fieldName: this.fieldName,
      ordering: this.ordering,
    };
  }
}
