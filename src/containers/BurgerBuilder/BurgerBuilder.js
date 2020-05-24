import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/WithError/withError";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchased: false,
  };
  componentDidMount() {
    this.props.initIngredients();
  }
  purchasable = () => {
    const sum = Object.keys(this.props.ingredients)
      .map((key) => {
        return this.props.ingredients[key];
      })
      .reduce((prev, el) => {
        return prev + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (!this.props.auth) {
      this.props.history.push("/auth");
    } else {
      const purchased = this.state.purchased;
      this.setState({
        purchased: !purchased,
      });
    }
  };
  cancelPurchaseHandler = () => {
    this.setState({
      purchased: false,
    });
  };
  continuePurchaseHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let ordersummary = null;
    let burger = null;
    if (this.props.error) {
      burger = "Cannot load ingredients";
    } else if (this.props.ingredients == null) {
      burger = <Spinner />;
    }
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            auth={this.props.auth}
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disableInfo}
            price={this.props.price}
            purchasable={this.purchasable}
            purchase={this.purchaseHandler}
          />
        </Aux>
      );
      ordersummary = (
        <OrderSummary
          continue={this.continuePurchaseHandler}
          cancel={this.cancelPurchaseHandler}
          ingredients={this.props.ingredients}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      ordersummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchased} modalClosed={this.purchaseHandler}>
          {ordersummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.price,
    error: state.burgerBuilderReducer.error,
    auth: state.auth.token !== null ? true : false,
  };
};

const mapActionsToProps = (despatch) => {
  return {
    addIngredient: (type) => despatch(actions.addIngredient(type)),
    removeIngredient: (type) => despatch(actions.removeIngredient(type)),
    initIngredients: () => despatch(actions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withError(BurgerBuilder, axios));
