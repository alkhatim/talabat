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

const CategoriesFourm = ({ category, onCategoryChange, onCreate }) => {
  return (
    <Col lg={12}>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Add Category</CardTitle>

          <Form>
            <FormGroup className="row mb-4">
              <Label
                for="horizontal-firstname-Input"
                className="col-sm-3 col-form-Label"
              >
                Name
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={category.name}
                  onChange={onCategoryChange}
                />
              </Col>
            </FormGroup>

            <Button color="primary" className="w-md" onClick={onCreate}>
              Add
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoriesFourm;
