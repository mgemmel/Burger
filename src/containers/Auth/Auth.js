import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    register: false,
    form: {
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
      password: {
        elementType: "input",
        elementconfig: {
          type: "password",
          placeholder: "Enter password",
        },
        value: "",
        validation: {
          required: true,
          min: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, id) => {
    const form = { ...this.state.form };
    const element = { ...form[id] };
    element.value = event.target.value;
    element.valid = this.checkValidity(event.target.value, element.validation);
    element.touched = true;
    form[id] = element;
    let valid = true;
    for (let id in form) {
      valid = form[id].valid && valid;
    }
    this.setState({ form: form, valid: valid });
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

  authHandler = (event) => {
    event.preventDefault();
    this.props.auth(
      this.state.form.email.value,
      this.state.form.password.value,
      this.state.register
    );
  };

  swritchMode = () => {
    this.setState((prev) => {
      return {
        register: !prev.register,
      };
    });
  };

  render() {
    const formElements = [];
    for (let key in this.state.form) {
      formElements.push({
        id: key,
        config: this.state.form[key],
      });
    }
    let form = (
      <form onSubmit={this.authHandler}>
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
        <Button btnType="Success">Submit</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    const redirect = this.props.authenticated ? <Redirect to="/" /> : null;
    return (
      <div className={styles.authData}>
        {redirect}
        {form}
        <Button btnType="Success" clicked={() => this.swritchMode()}>
          Switch to {this.state.register ? "Login" : "Register"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.token == null ? false : true,
  };
};

const mapActionsToProps = (despatch) => {
  return {
    auth: (email, pwd, register) =>
      despatch(actions.auth(email, pwd, register)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Auth);
