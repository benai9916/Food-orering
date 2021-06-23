import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px !important",
  },
  media: {
    height: 343,
    [theme.breakpoints.up("md")]: {
      height: 343,
    },
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
  fav: {
    "&:hover": {
      color: "#ff809f",
    },
  },
  fab: {
    height: 30,
    width: 37,
  },
  rating: {
    position: "absolute",
    right: 14,
    marginBottom: 0,
  },
  colorMe: {
    color: "#ff809f"
  }
}));

export default useStyles;