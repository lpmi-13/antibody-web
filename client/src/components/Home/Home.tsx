// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from "react";
import { useHistory } from "react-router-dom";
import Login from "../Login/Login";
import { AppContext, withApp } from "components/App/context";
import { useCookies } from "react-cookie";

export const Home = ({ app }: { app: AppContext }) => {

  // For now we are just storing an id generated by the backend as our login identification.
  // We will eventually decode a user_id from the login response jwt and retrieve the test record based on that.
  const [ , setCookie ] = useCookies(["login-token"]);
  const { dispatch } = app;
  const history = useHistory();
  const login = app.container.getLogin();
  
  const handleLogin = async (signInId: string) => {
    const response = await login(signInId);

    if (response.successful) {
      dispatch({
        type: "LOGIN_SUCCESS",
        token: response.token
      });

      // For now, just generate a uuid on login if one isn't set
      setCookie('login-token', response.token);
      
      history.push("/test");
    } else {
      dispatch({
        type: "LOGOUT"
      });
    }
  };

  return (
    <Login
      formSubmit={handleLogin}
    />
  );
};

export default withApp(Home);
