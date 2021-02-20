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
import messages from "services/messages";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "../../components/common/Breadcrumb";
import {
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
    userName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await editUser(params.id, user);
    if (result) {
      setUser(result);
      messages.success("Changed Successfuly");
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
    else fetch();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Agencies" breadcrumbItem="User" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">User Details</CardTitle>

                  <Form>
                    <FormGroup className="row mb-4">
                      <Label for="userName" className="col-sm-3 col-form-Label">
                        Username
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="userName"
                          name="userName"
                          type="text"
                          className="form-control"
                          value={user.userName}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="row mb-4">
                      <Label for="email" className="col-sm-3 col-form-Label">
                        Email
                      </Label>
                      <Col sm={9}>
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
                      <Label
                        for="phoneNumber"
                        className="col-sm-3 col-form-Label"
                      >
                        Phone
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          className="form-control"
                          value={user.phoneNumber}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="row justify-content-end">
                      <Col sm={9}>
                        <div>
                          <Button
                            color="success"
                            className="w-md mr-2"
                            onClick={handleSubmit}
                          >
                            Confirm
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => {
                              setResetPasswordModal(true);
                            }}
                            id="resetPassword"
                          >
                            Reset Password
                          </Button>
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
    </React.Fragment>
  );
};

export default User;
