import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuth } from "./store/actions/auth";
class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
    if (this.props.auth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token ? true : false,
  };
};

const mapActionsToProps = (despatch) => {
  return {
    checkAuth: () => despatch(checkAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
