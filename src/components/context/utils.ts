import { equals } from "lodash/fp";
// @ts-ignore: module missing defintion file
import memoize from "memoize-one";

const equality = (a: any, b: any) => equals(a, b);
