import { Component } from "react";
import "./index.css";

class LoginForm extends Component {
  state = {
    full_name: "",
    full_err: "",
    password: "",
    password_err: "",
  };
  onBlurFull = () => {
    const { full_name, password } = this.state;
    const full_err = full_name.length === 0 ? "red" : "black";
    const password_err = password.length === 0 ? "red" : "black";
    this.setState({ full_err, password_err });
  };

  onChangeFullName = (event) => {
    this.setState({ full_name: event.target.value, full_err: "black" });
  };
  onChangeEmail = (event) => {
    this.setState({ email_address: event.target.value, email_err: "black" });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value, password_err: "black" });
  };

  onChangeCheckbox = (event) => {
    const { checkbox } = this.state;
    this.setState({ checkbox: !checkbox });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { full_name, password } = this.state;
    const userData = {
      user_firstname: full_name,
      user_password: password,
      user_city: "Hyderabad",
      user_zipcode: "500072",
    };

    if (full_name.length > 0 && password.length > 0) {
      const url = `https://syoft.dev/Api/user_registeration/api/user_registeration`;
      const options = {
        method: "GET",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok === true) {
        this.setState({ account_created: true });
      } else {
        this.setState({ account_created: false });
      }
    } else {
      console.log("error");
      this.setState({ checkbox_err: "red" });
    }
  };
  onClickSign = (event) => {
    event.preventDefault();
    const { onClickSignin } = this.props;
    onClickSignin(false);
  };

  render() {
    const { full_err, password_err } = this.state;
    return (
      <div className="right">
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOR40AGg2O13ilhvCEQT_Q0l09cvd4-h8jfQ&s"
          alt="logo"
        />
        <form>
          <h2>Sign In</h2>
          <p>
            If you don't have an account?{" "}
            <button className="signBtn sign" onClick={this.onClickSign}>
              Sign Up
            </button>
          </p>
          <div className="input-box">
            <label className={full_err} htmlFor="User-name">
              User Name*
            </label>
            <input
              onChange={this.onChangeFullName}
              onBlur={this.onBlurFull}
              className={"input"}
              type="text"
              id="user-name"
            />
          </div>

          <div className="input-box">
            <label className={password_err} htmlFor="password">
              Password*
            </label>
            <input
              onChange={this.onChangePassword}
              onBlur={this.onBlurFull}
              className="input"
              type="text"
              id="password"
            />
          </div>

          <div className="button-box">
            <button
              onClick={this.onClickLogin}
              className="button sign"
              type="submit"
            >
              Login to your account
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
