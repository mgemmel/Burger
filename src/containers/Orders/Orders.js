import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Orders extends Component {
  componentDidMount() {
    this.props.loadOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      const orderss = this.props.orders;
      orders = orderss.map((val, index) => {
        return (
          <Order ingredients={val.ingredients} price={val.price} key={index} />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapActionsToProps = (despatch) => {
  return {
    loadOrders: (token, userId) => despatch(actions.loadOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withError(Orders, axios));
