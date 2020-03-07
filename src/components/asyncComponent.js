import React, { Component } from 'react';
import {
  KeepAlive,
} from 'react-keep-alive';
export default function asyncComponent(importComponent, name) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C
        ? name ? <KeepAlive name={name}>
          <C {...this.props} />
        </KeepAlive> : <C {...this.props} />
        : null;
    }

  }

  return AsyncComponent;
}