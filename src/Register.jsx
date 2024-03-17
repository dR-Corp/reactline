import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button, TextField, Link } from "@mui/material";
import { withRouter } from "./utils";
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: ''
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (token) {
      // this.props.history.push('/login');
      this.props.navigate("/dashboard");
      // this.props.navigate("/login");
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('https://openode.onrender.com/api/auth/register', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      // console.log(res.data);
      Swal.fire({
        text: res.data.message,
        icon: "success",
        type: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500
      });
      // this.props.history.push('/');
      this.props.navigate("/");
    }).catch((err) => {
      Swal.fire({
        text: "Une erreur est survenue",
        icon: "error",
        type: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="email-field"
            type="email"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <TextField
            id="password-field"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="password-confirm-field"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.email == '' && this.state.password == ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/");
            }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);