import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Box, Button, Grid, Container, InputLabel,
    FormControl,Select } from "@material-ui/core";
import AddProductModal from "../AddMenuModal/addMenuModal";

import { getMenuDetail } from "../redux/actions/menu";

import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";

const GetMenu = ({ search }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [sortProduct, setSortProduct] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getMenuDetail());
  }, [currentId, reload, open, dispatch]);

  const products = useSelector((state) => state.menu);

  console.log("========================", products.length)

  //  add product
  const handleOpen = () => {
    setCurrentId(null);
    setOpen(true);
    setReload(false);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(null);
  };

    // sort
    const handleSort = (e) => {
        setSortProduct(e.target.value);
      };

  const sortByRatingNPrice = products.sort((a, b) => {
    switch (sortProduct) {
      case "price_low_high":
        return a.price - b.price;
      case "price_high_low":
        return b.price - a.price;
      case "rating_high_low":
        return b.Rating - a.Rating;
      case "rating_low_high":
        return a.Rating - b.Rating;
      default:
        return products;
    }
  });

  return (
    <Box style={{ marginTop: 100 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <Button
              className={classes.btnstyle}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Add Menu
            </Button>
            <AddProductModal
              currentId={currentId}
              open={open}
              handleClose={handleClose}
              setReload={setReload}
            />
          </Box>
        </Grid>
      </Grid>

    {  products.length !== 0 && (
      <Box>
        <div className={classes.productContainer}>
          <Container width="xl" className={classes.secondRoot}>
            <Box>
              <Grid container className={classes.breadcrumbs}>
                <Grid item xs={6} className={classes.sortStyle}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <div className={classes.formControl}>
                      <InputLabel
                        htmlFor="outlined-age-native-simple"
                        className={classes.formControl}
                      >
                        Sort by
                      </InputLabel>
                      <Select
                        native
                        value={sortProduct}
                        onChange={handleSort}
                        label="Age"
                        inputProps={{
                          name: "age",
                          id: "outlined-age-native-simple",
                        }}
                        className={`${classes.styleSelect} ${classes.select}`}
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price_low_high">
                          Price Low to High
                        </option>
                        <option value="price_high_low">
                          Price High to Low
                        </option>
                        <option value="rating_high_low">
                          Rating High to Low
                        </option>
                        <option value="rating_low_high">
                          Rating Low to High
                        </option>
                      </Select>
                    </div>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            { !products.length > 0 && (
              <Grid container spacing={4}>
                {sortByRatingNPrice
                  .filter(
                    (txt) =>
                      txt["product_name"]
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      txt["Product_description"]
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      String(txt["price"])
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((items, index) => (
                    <Grid key={index} item lg={4} md={6} xs={12} sm={6}>
                      <Card
                        items={items}
                      />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Container>
        </div>
      </Box>
      )}
    </Box>
  );
};

export default GetMenu;
