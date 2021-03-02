import {
  Card,
  Col,
  CardBody,
  CardTitle,
  FormGroup,
  Button,
  Form,
} from "reactstrap";

const FilesForm = ({ file, onFileChange, onUpload }) => {
  return (
    <Card>
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
            <i className="bx bx-upload font-size-16 align-middle mr-2" />
            Upload
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default FilesForm;
