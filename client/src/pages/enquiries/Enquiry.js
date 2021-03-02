import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
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
import Select from "react-select";
import messages from "../../services/messages";
import Breadcrumbs from "../../components/common/Breadcrumb";
import validateEnquiry from "./utils/validateEnquiry";
import {
  getEnquiry,
  updateEnquiry,
  createEnquiry,
} from "../../store/actions/enquiryActions";

const Enquiry = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [enquiry, setEnquiry] = useState({
    _id: "",
    client: "",
    phone: "",
    description: "",
    contactMethod: "",
    contactAccount: "",
    notes: "",
    link: "",
    comments: [],
  });

  const handleChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let result;
    let payload = {
      ...enquiry,
      _id: enquiry._id || undefined,
    };

    const { error } = validateEnquiry(payload);
    if (error) return messages.error(error.details[0].message);

    if (payload._id) {
      result = await updateEnquiry(params.id, payload);
    } else {
      result = await createEnquiry(payload);
    }
    if (result) {
      messages.success("Saved Successfuly");
      setEnquiry(result);
      history.push(`/enquiry/${result._id}/info`);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await getEnquiry(params.id);
      if (enquiry) setEnquiry(result);
    };
    if (location.state?.enquiry) setEnquiry(location.state.enquiry);
    else if (params.id) fetch();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Enquiries" breadcrumbItem="Enquiry" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-5">Enquiry Details</CardTitle>
                <Row>
                  <Col lg={6}>
                    <Form>
                      <FormGroup>
                        <Label for="client">Client Name</Label>
                        <Input
                          id="client"
                          name="client"
                          type="text"
                          className="form-control"
                          value={enquiry.client}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          className="form-control"
                          value={enquiry.phone}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="contactMethod">Contact Method</Label>
                        <select
                          id="contactMethod"
                          name="contactMethod"
                          className="form-control"
                          value={enquiry.contactMethod}
                          onChange={handleChange}
                        >
                          <option value="">Choose...</option>
                          <option value="FACEBOOK">Facebook</option>
                          <option value="WHATSAPP">Whatsapp</option>
                          <option value="INSTAGRAM">Instagram</option>
                          <option value="PHONECALL">Phone Call</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <Label for="contactAccount">Social Media Account</Label>
                        <Input
                          id="contactAccount"
                          name="contactAccount"
                          type="text"
                          className="form-control"
                          value={enquiry.contactAccount}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col lg={6}>
                    <Form>
                      <FormGroup>
                        <Label for="description">Item Description</Label>
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          className="form-control"
                          value={enquiry.description}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="link">Item Link</Label>
                        <Input
                          id="link"
                          name="link"
                          type="text"
                          className="form-control"
                          value={enquiry.link}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input
                          id="notes"
                          name="notes"
                          type="textarea"
                          maxLength="256"
                          rows="3"
                          placeholder="Any additional notes..."
                          className="form-control"
                          value={enquiry.notes}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <div className="center">
                  <Button
                    color="success"
                    className="w-md"
                    onClick={handleSubmit}
                  >
                    <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>
                    Confirm
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default Enquiry;
