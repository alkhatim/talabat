import {
  Card,
  Col,
  CardBody,
  CardTitle,
  FormGroup,
  Button,
  Form,
} from "reactstrap";

const FilesForm = ({ file, onFileChange, onUpload, style }) => {
  return (
    <Card style={style}>
      <CardBody>
        <CardTitle className="mb-4">Upload Attachment</CardTitle>

        <Form>
          <FormGroup className="row mb-4">
            <div className="custom-file">
              <input
                type="file"
                id="file"
                className="custom-file-input"
                onChange={onFileChange}
              />
              <label className="custom-file-label" htmlFor="file">
                {file.name || "Choose file"}
              </label>
            </div>
          </FormGroup>

          <Button color="primary" className="w-md" onClick={onUpload}>
            Upload
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default FilesForm;
