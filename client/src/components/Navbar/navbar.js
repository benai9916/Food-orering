import React , { useEffect, useState } from 'react';
import useStyles from './style';
import { IconButton, Button, Typography,Toolbar, AppBar, InputBase } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionType';
import decode from 'jwt-decode';
import SearchIcon from "@material-ui/icons/Search";

const NavBar = ({ searchProduct })  => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const login =() => {
    history.push('/auth');
  }

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');
    // window.location.href = '/auth';

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed"
        color="transparent"
        classes={{ root: classes.hide }}>
        <Toolbar className={classes.wrapper}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <StorefrontIcon />
          </IconButton>
          <Typography component={Link} to="/" variant="h6" className={classes.title} style={{ color: "black", textDecoration: 'none'}}>
            Home
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={searchProduct}
            />
          </div>
          {user?.result ?  (
            <div style={{ display: 'flex', alignItems: "center"}}>
              <h3> Welcome {user?.result.name}</h3>
              <Button style={{marginLeft: 10}}  variant="contained" color="inherit" 
              color="secondary" onClick={(e) => {logout()}}>Logout</Button>
            </div>
          ) : ( 
            <Button onClick={login} variant="contained" color="inherit" color="secondary">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar
