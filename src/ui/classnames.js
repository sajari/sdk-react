/**
 * Produces a css class string from a class name to boolean value object map.
 * Only class names whose values evaluate to true will be included.
 * @param {Object} classes
 * @return {string}
 */
const classnames = classes =>
  Object.keys(classes).filter(key => classes[key]).join(" ");

export default classnames;
