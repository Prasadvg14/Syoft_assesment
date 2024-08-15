import { Component } from "react";
import "./index.css";

class RegistrationForm extends Component {
  state = {
    full_name: "",
    full_err: "",
    email_address: "",
    email_err: "",
    password: "",
    password_err: "",
    company: "e",
    account_created: false,
    checkbox: false,
    checkbox_err: "",
  };
  onBlurFull = () => {
    const { full_name, email_address, password, checkbox } = this.state;
    const full_err = full_name.length === 0 ? "red" : "black";
    const email_err = email_address.length === 0 ? "red" : "black";
    const password_err = password.length === 0 ? "red" : "black";
    const checkbox_err = checkbox ? "black" : "red;";
    this.setState({ full_err, email_err, password_err, checkbox_err });
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

  onSubmitCreateButton = async (event) => {
    event.preventDefault();
    const {
      full_name,
      email_address,
      password,
      company,
      checkbox,
    } = this.state;
    const userData = {
      user_firstname: full_name,
      user_email: email_address,
      user_phone: "",
      user_password: password,
      user_lastname: "",
      user_company: company,
      user_city: "Hyderabad",
      user_zipcode: "500072",
    };

    if (
      checkbox &&
      full_name.length > 0 &&
      password.length > 0 &&
      email_address.length > 0
    ) {
      const url = `https://syoft.dev/Api/user_registeration/api/user_registeration`;
      const options = {
        method: "POST",
        body: JSON.stringify(userData),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response.ok);
      console.log(data);
      if (response.ok === true) {
        this.setState({ account_created: true });
      } else {
        this.setState({ account_created: false });
      }
    } else {
      console.log("error");
      this.onBlurFull();
    }
  };
  onClickSign = (event) => {
    event.preventDefault();
    const { onClickSignin } = this.props;
    onClickSignin(false);
  };

  render() {
    const {
      full_err,
      email_err,
      password_err,
      account_created,
      checkbox_err,
    } = this.state;
    return (
      <div className="right">
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOR40AGg2O13ilhvCEQT_Q0l09cvd4-h8jfQ&s"
          alt="logo"
        />
        <form>
          <h2>Sign Up</h2>
          <p>
            Already have an account?{" "}
            <button className="signBtn sign" onClick={this.onClickSign}>
              Sign in
            </button>
          </p>
          <div className="input-box">
            <label className={full_err} htmlFor="email-address">
              Full Name*
            </label>
            <input
              onChange={this.onChangeFullName}
              onBlur={this.onBlurFull}
              className={"input"}
              type="text"
              id="full-name"
            />
          </div>
          <div className="input-box">
            <label className={email_err} htmlFor="email-address">
              Email address*
            </label>
            <input
              onChange={this.onChangeEmail}
              onBlur={this.onBlurFull}
              className="input"
              type="text"
              id="email-address"
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
          <div className="input-box">
            <label htmlFor="company">Company</label>
            <input className="input" type="text" id="company" />
          </div>
          <div className="terms-box">
            <input
              onBlur={this.onBlurFull}
              onChange={this.onChangeCheckbox}
              id="checkbox"
              className="terms-inp"
              type="checkbox"
            />
            <label htmlFor="checkbox" className={checkbox_err}>
              I agree to the <span className="span">Terms of service</span> and{" "}
              <span>Privacy Policy</span>
            </label>
          </div>
          <div className="button-box">
            <button
              onClick={this.onSubmitCreateButton}
              className="button sign"
              type="submit"
            >
              Create your free account
            </button>
            <h1>{account_created}</h1>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
