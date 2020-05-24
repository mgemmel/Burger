import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
//import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import "./ContactData.css";
import { saveOrder } from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    valid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        touched: false,
      },
      street: {
        elementType: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementconfig: {
          type: "text",
          placeholder: "Zip code",
        },
        value: "",
        validation: {
          required: true,
          min: 5,
          max: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementconfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementconfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        valid: true,
        value: "fastest",
        touched: false,
      },
    },
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.min) {
      isValid = value.length >= rules.min && isValid;
    }
    if (rules.max) {
      isValid = value.length <= rules.max && isValid;
    }
    return isValid;
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let el in this.state.orderForm) {
      formData[el] = this.state.orderForm[el].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.save(order, this.props.token);
  };
  inputChangedHandler = (event, id) => {
    const form = { ...this.state.orderForm };
    const element = { ...form[id] };
    element.value = event.target.value;
    element.valid = this.checkValidity(event.target.value, element.validation);
    element.touched = true;
    form[id] = element;
    let valid = true;
    for (let id in form) {
      valid = form[id].valid && valid;
    }
    this.setState({ orderForm: form, valid: valid });
  };
  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((element) => {
          return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementconfig={element.config.elementconfig}
              change={(event) => this.inputChangedHandler(event, element.id)}
              value={element.config.value}
              invalid={!element.config.valid}
              touched={element.config.touched}
              shouldValidate={element.config.validation}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.valid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
    ingredients: state.burgerBuilderReducer.ingredients,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapActionsToProps = (despatch) => {
  return {
    save: (data, token) => despatch(saveOrder(data, token)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(ContactData);
