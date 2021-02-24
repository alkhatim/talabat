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
                Sudanese Pound
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="SDG"
                  name="SDG"
                  className="form-control"
                  value={rates.SDG}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                UAE Dirhams
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="AED"
                  name="AED"
                  className="form-control"
                  value={rates.AED}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                Saudi Riyal
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="SAR"
                  name="SAR"
                  className="form-control"
                  value={rates.SAR}
                  onChange={onRatesChange}
                />
              </Col>
            </FormGroup>

            <Button color="success" className="w-md" onClick={onUpdate}>
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoriesFourm;
