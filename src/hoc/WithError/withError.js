import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
const withError = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqI = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resI = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
        console.log(error);
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqI);
      axios.interceptors.request.eject(this.resI);
    }
    closeModal = () => {
      this.setState({
        error: null,
      });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.closeModal}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withError;
