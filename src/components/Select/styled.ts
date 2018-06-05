// tslint:disable
export const styles = {
  container: (base: any, { isFocused }: { [k: string]: boolean }) => {
    return {
      ...base,
      borderBottom: "1px solid",
      borderBottomColor: isFocused ? "currentcolor" : "#ccc",
      display: "inline-block",
      padding: "0.25em 0",
      width: "auto"
    };
  },
  control: (base: any, { isFocused }: { [k: string]: boolean }) => {
    return {
      ...base,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 0,
      boxShadow: null,
      color: "#666",
      display: "inline-flex",
      fontSize: "0.8em",
      minHeight: 0,
      minWidth: "120px"
    };
  },
  option: (
    base: any,
    { isDisabled, isFocused, isSelected }: { [k: string]: boolean }
  ) => {
    return {
      ...base,
      backgroundColor: isDisabled
        ? null
        : isSelected || isFocused
          ? "#eaeaea"
          : null,
      color: "#666"
    };
  },
  menu: (base: any) => ({
    ...base,
    borderRadius: 0,
    fontSize: "0.8em",
    width: "100%"
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "0 0 0 .5em"
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: "0 0 0 .5em"
  }),
  singleValue: () => ({
    fontWeight: "bold",
    padding: 0
  }),
  placeholder: (base: any) => ({
    padding: 0
  }),
  input: () => ({
    padding: 0
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: 0
  })
};
