import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";
import messages from "../../services/messages";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "../../components/common/Breadcrumb";
import validateUser from "./utils/validateUser";
import {
  addUser,
  getUser,
  editUser,
  resetUserPassword,
} from "../../store/actions/userActions";

const User = () => {
  const location = useLocation();
  const params = useParams();

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [user, setUser] = useState({
    _id: "",
    username: "",
    phone: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { error } = validateUser(user);
    if (error) return messages.error(error.details[0].message);

    let result;
    if (user._id) {
      result = await editUser(params.id, user);
    } else {
      result = await addUser(user);
    }
    if (result) {
      setUser(result);
      messages.success("Saved Successfuly");
    }
  };

  const handleResetPassword = async () => {
    const result = await resetUserPassword(params.id);
    if (result) {
      setResetPasswordModal(false);
      setResetPasswordDialog(true);
      setNewPassword(result.password);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await getUser(params.id);
      setUser(result);
    };
    if (location.state?.user) setUser(location.state.user);
    else if (params.id) fetch();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Users" breadcrumbItem="User" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-5">User Details</CardTitle>

                <Form>
                  <FormGroup className="row mb-4">
                    <Label for="username" className="col-sm-2 col-form-Label">
                      Username
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        value={user.username}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="row mb-4">
                    <Label for="email" className="col-sm-2 col-form-Label">
                      Email
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="row mb-4">
                    <Label for="phone" className="col-sm-2 col-form-Label">
                      Phone
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="phone"
                        name="phone"
                        type="text"
                        className="form-control"
                        value={user.phone}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="row mb-4">
                    <Label for="role" className="col-sm-2 col-form-Label">
                      Role
                    </Label>
                    <Col sm={8}>
                      <select
                        id="role"
                        name="role"
                        className="form-control"
                        value={user.role}
                        onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                        <option value="cs">Customer Support</option>
                      </select>
                    </Col>
                  </FormGroup>

                  <FormGroup className="row justify-content-end">
                    <Col sm={8}>
                      <div>
                        <Button
                          color="success"
                          className="w-md mr-2"
                          onClick={handleSubmit}
                        >
                          <i className="bx bx-check-double font-size-16 align-middle mr-2" />
                          Confirm
                        </Button>
                        {user._id && (
                          <Button
                            color="primary"
                            onClick={() => {
                              setResetPasswordModal(true);
                            }}
                            id="resetPassword"
                          >
                            <i className="bx bx-reset font-size-16 align-middle mr-2" />
                            Reset Password
                          </Button>
                        )}
                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Reset password modal */}
        <>
          {resetPasswordModal && (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmButtonText="Yes, reset it!"
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={handleResetPassword}
              onCancel={() => setResetPasswordModal(false)}
            >
              You won't be able to revert this!
            </SweetAlert>
          )}
          {resetPasswordDialog && (
            <SweetAlert
              success
              title="Password was reset Successfully"
              onConfirm={() => {
                setResetPasswordDialog(false);
              }}
            >
              <h5>New Password: {newPassword}</h5>
            </SweetAlert>
          )}
        </>
        {/* End of reset password modal */}
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default User;
