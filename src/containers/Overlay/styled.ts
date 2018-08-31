import { styled } from "../../components/styles";

export const BlurContainer = styled("div")({
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1000
});

export const Container = styled("div")({
  backgroundColor: "#fff",
  boxSizing: "border-box",
  height: "80%",
  padding: "1em",
  width: "80%"
});
