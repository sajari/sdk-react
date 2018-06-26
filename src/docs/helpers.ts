import { Filter } from "../controllers";
import { styled, StyledComponent } from "../components/styles";

export const ExampleContainer = styled("div")({
  border: "1px solid #D3DCE6",
  borderRadius: "5px",
  padding: "2rem",
  marginBottom: "1rem"
});

export const categoryFilter = () =>
  new Filter(
    {
      All: "",
      Blog: "dir1='blog'",
      Articles: "dir1='articles'"
    },
    ["All"]
  );

export const categoryMultiFilter = () =>
  new Filter(
    {
      Other: "dir1!='blog' AND dir1!='articles'",
      Blog: "dir1='blog'",
      Articles: "dir1='articles'"
    },
    ["Blog", "Articles"],
    true
  );
