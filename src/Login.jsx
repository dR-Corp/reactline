import React from "react";
import Swal from "sweetalert2";
import { Button, TextField, Link } from "@mui/material";
import {} from '@mui/lab';
import { withRouter } from "./utils";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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

  login = () => {

    axios.post('https://openode.onrender.com/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      // this.props.history.push('/dashboard');
      this.props.navigate("/dashboard");
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        Swal.fire({
          text: "Une erreur est survenue",
          icon: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500
        });
      }
      else {
        Swal.fire({
          text: "Veuillez réessayer plus tard",
          icon: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Login</h2>
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
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.email == '' && this.state.password == ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/register"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);