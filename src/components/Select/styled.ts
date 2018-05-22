export const styles = {
  container: (base: any, { isFocused }: { [k: string]: boolean }) => {
    return {
      ...base,
      width: "auto",
      display: "inline-block",
      padding: "0.25rem 0",
      borderBottom: "1px solid",
      borderBottomColor: isFocused ? "currentcolor" : "#ccc"
    };
  },
  control: (base: any, { isFocused }: { [k: string]: boolean }) => {
    return {
      ...base,
      minHeight: 0,
      backgroundColor: "transparent",
      fontSize: "0.8rem",
      borderRadius: 0,
      color: "#666",
      border: "none",
      boxShadow: null,
      display: "inline-flex",
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
    width: "100%",
    borderRadius: 0,
    fontSize: "0.8rem"
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
    padding: "0 0 0 .5rem"
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: "0 0 0 .5rem"
  }),
  singleValue: () => ({
    padding: 0,
    fontWeight: "bold"
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
