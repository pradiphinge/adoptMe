import React, { Component } from "react";
import { Link, navigate } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  timer = null;
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      this.timer = setTimeout(() => navigate("/"), 5000);
      console.log("timer set");
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      console.log("timer cleaned");
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with listing. <Link to="/">Click Here</Link> to go
          back to the home page.
        </h2>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
