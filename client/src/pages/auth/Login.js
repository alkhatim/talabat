import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { login } from "../../store/actions/authActions";
import { Row, Col, CardBody, Card, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import loginSplash from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn } = useSelector((store) => store.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    remeberMe: true,
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return isLoggedIn ? (
    <Redirect to={location.state.from || "/dashboard"} />
  ) : (
    <>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-5">
                        <h5>Sign in to continue</h5>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={loginSplash} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        dispatch(login(credentials));
                      }}
                    >
                      <div className="form-group">
                        <AvField
                          name="username"
                          label="Username"
                          value={credentials.username}
                          className="form-control"
                          placeholder="Enter Username"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          value={credentials.password}
                          type="password"
                          onChange={handleChange}
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                          name="rememberMe"
                          value={credentials.remeberMe}
                          onChange={handleChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} Talabat</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
