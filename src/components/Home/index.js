import { Component } from "react";
import RegistrationForm from "../RegistrationForm";
import LoginForm from "../LoginForm";
import "./index.css";

class Home extends Component {
  state = {
    newUser: true,
  };
  onClickSignin = (user) => {
    const { newUser } = this.state;
    this.setState({ newUser: !newUser });

    console.log(newUser);
  };

  render() {
    const { newUser } = this.state;
    console.log(newUser);
    return (
      <div className="page">
        <div className="left">
          <h1 className="heading">Welcome to our community</h1>
          <p className="para">
            Fuse helps developers to build organized and well coded dashboards
            full beautiful and rich modules. Join us and start building
            application today.
          </p>
          <p>
            <span>imgs</span> More than 17k people joined us, it's your turn
          </p>
        </div>
        {newUser ? (
          <RegistrationForm onClickSignin={this.onClickSignin} />
        ) : (
          <LoginForm onClickSignin={this.onClickSignin} />
        )}
      </div>
    );
  }
}

export default Home;
