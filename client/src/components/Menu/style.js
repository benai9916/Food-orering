import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btnstyle: {
      height: 42,
      minWidth: 90,
    },
    formControl: {
        "& .MuiInputLabel-formControl": {
          top: "-6px",
        }
      },
      select: {
        "& .MuiSelect-select": {
          "&:focus": {
            backgroundColor: "transparent",
          }
        }
      },
      secondRoot: {
          flexGrow: 1,
        },
        productContainer: {
            backgroundRepeat: "no-repeat",
            height: "autp",
            padding: 0,
            minHeight: "80vh",
        },
        breadcrumbs: {
            paddingTop: 10,
            paddingBottom: 20,
        },
        sortStyle: {
          display: "flex",
          justifyContent: "flex-end",
        },
        styleSelect: {
          width: 250,
          height: 42,
          [theme.breakpoints.down('sm')]: {
            width: '150px',
          },
        },
  }));

export default useStyles