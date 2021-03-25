import {
  Card,
  Col,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";

const CategoriesFourm = ({ rates, onRatesChange, onUpdate }) => {
  return (
    <Col lg={12}>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Update Rates</CardTitle>

          <Form>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                USD to SDG
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="USD2SDG"
                  name="USD2SDG"
                  className="form-control"
                  value={rates.USD2SDG}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                USD to AED
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="USD2AED"
                  name="USD2AED"
                  className="form-control"
                  value={rates.USD2AED}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                USD to SAR
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="USD2SAR"
                  name="USD2SAR"
                  className="form-control"
                  value={rates.USD2SAR}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                AED to SDG
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="AED2SDG"
                  name="AED2SDG"
                  className="form-control"
                  value={rates.AED2SDG}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                AED to SAR
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="AED2SAR"
                  name="AED2SAR"
                  className="form-control"
                  value={rates.AED2SAR}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                SAR to SDG
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="SAR2SDG"
                  name="SAR2SDG"
                  className="form-control"
                  value={rates.SAR2SDG}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>

            <Button color="success" className="w-md" onClick={onUpdate}>
              <i className="bx bx-check-double font-size-16 align-middle mr-2" />
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoriesFourm;
