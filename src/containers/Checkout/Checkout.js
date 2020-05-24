import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Checkoutsummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelHandler = () => {
    this.props.history.goBack();
  };
  continuehandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          continue={this.continuehandler}
          cancel={this.cancelHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.props.ingredients}
              price={this.props.price}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.price,
  };
};

export default connect(mapStateToProps)(Checkout);
