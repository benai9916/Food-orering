import React, { useState, useEffect } from "react";
import useStyles from "./style";
import {
  Modal,
  Button,
  TextField,
  Box,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FileBase from 'react-file-base64';

// send data to redux
import { useDispatch, useSelector } from "react-redux";
import { addMenuDetail } from "../redux/actions/menu";

const AddMenuModal = ({ currentId, open, handleClose, setReload }) => {
  const classes = useStyles();
  const userdata = JSON.parse(localStorage.getItem("profile"));

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: [],
    image: "",
  });

  useEffect(() => {
    if (currentId === null) {
      setProductData({ name: "", description: "", price: "", image: "" });
    }
  }, [currentId]);

  const dispatch = useDispatch();

  const product = useSelector((state) =>
    currentId ? state.products.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (product) setProductData(product);
  }, [product]);

  //  form data
  const handleSubmit = (e) => {
    setReload(true);
    console.log("=========================",productData )
    dispatch(addMenuDetail(productData));
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"> Add</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className={classes.txtfield}
                required
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
                label="Name"
              />

              <TextField
                className={classes.txtfield}
                required
                label="price"
                value={productData.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
              />

              <TextField
                className={classes.txtfield}
                required
                label="Description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({ ...productData, description: e.target.value })
                }
              />

              <Box style={{ marginTop: 50, width: "100%" }}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setProductData({ ...productData, image: base64 })
                  }
                />
              </Box>

              <Box style={{ marginTop: 38 }}>
                <Button
                  className={classes.btnstyle}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  className={classes.btnstyle}
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddMenuModal;
