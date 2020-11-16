import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "./component/Header";
import { Bye } from "./pages/Bye";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/bye" component={Bye} />
      </Switch>
    </BrowserRouter>
  );
};
