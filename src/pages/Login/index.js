import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { login_url } from "../../config";
import { useForm } from "../../hooks/useForm";

import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const [values, error, handleChange] = useForm({ email: '', password: '' });
  const [state, setState] = useState({ error: null, loading: false });

  useEffect(() => {
    localStorage.getItem("user") && navigate("/");
  }, [state, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.keys(error).every(key => !error[key]);

    if (isValid) {

      setState({ error: null, loading: true });

      axios({
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: login_url,
        data: values,
      }).then(res => {

        localStorage.setItem("user", JSON.stringify(res.data));
        setState({ error: null, loading: false });

      }).catch(err => {
        setState({ error: err.response.data.message, loading: false });
      });
    }
  };

  return (
    <div className="center-box w-full h-full">
      <div className="form-box login-container">
        <h1 className="title">Rapptr Labs</h1>
        <form onSubmit={onSubmit}>
          <Input
            className="mb-20px"
            type="email"
            name="email"
            label="Email"
            maxLength="50"
            error={error}
            placeholder="user@rapptrlabs.com"
            icon={<img src="https://static.thenounproject.com/png/1897908-200.png" alt="user-icon" />}
            value={values.email}
            onChange={handleChange}
            required
          />
          <Input
            className="mb-30px"
            type="password"
            name="password"
            label="Password"
            maxLength="10"
            minLength="4"
            error={error}
            placeholder="Must be at least 4 characters"
            icon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/OOjs_UI_icon_lock.svg/768px-OOjs_UI_icon_lock.svg.png" alt="lock-icon" />}
            value={values.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" label={state.loading ? "..." : "Login"} disabled={(state.loading || error)} />
          <div className="server-error">{state.error && state.error}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
