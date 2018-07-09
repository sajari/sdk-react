// @ts-ignore: module missing defintion file
import Cookies from "js-cookie";

export const getTrackingData = () => {
  const data = {} as { [k: string]: string };
  const ga = Cookies.get("_ga");
  if (ga) {
    data.ga = ga;
  }
  const sjID = Cookies.get("sjID");
  if (sjID) {
    data.sjID = sjID;
  }
  return data;
};
