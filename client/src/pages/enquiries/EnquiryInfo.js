import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import messages from "../../services/messages";
import Breadcrumbs from "../../components/common/Breadcrumb";
import {
  getEnquiry,
  addComment,
  getFile,
  getFiles,
  deleteFile,
  uploadFile,
} from "../../store/actions/enquiryActions";
import EnquiryComments from "./components/EnquiryComments";
import FilesTable from "../orders/components/FilesTable";
import FileForm from "../orders/components/FileForm";

const EnquiryInfo = () => {
  const params = useParams();
  const location = useLocation();

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

  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState({ name: "", mime: "", data: "" });
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    const result = await addComment(params.id, { comment: newComment });
    if (result) {
      setEnquiry(result);
      setNewComment("");
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleFileDelete = async (id) => {
    const result = await deleteFile(id);
    if (result) {
      messages.success("Deleted Successfuly");
      setFiles(files.filter((file) => file._id !== result._id));
    }
  };

  const handleFileOpen = async (id) => {
    const result = await getFile(id);
    if (result) window.open(result, "_blank");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewFile({ data: reader.result, name: file.name, mime: file.type });
      };
    } catch (error) {
      messages.error(error);
    }
  };

  const handleUpload = async () => {
    const result = await uploadFile({ ...newFile, owner: params.id });
    if (result) {
      setFiles(files.concat(result));
      setNewFile({ name: "", mime: "", data: "" });
      messages.success("Uploaded Successfuly");
    }
  };

  useEffect(() => {
    const fetchEnquiry = async () => {
      const result = await getEnquiry(params.id);
      if (result) setEnquiry(result);
    };
    const fetchFiles = async () => {
      const result = await getFiles(params.id);
      if (result) setFiles(result);
    };
    if (location.state?.enquiry) setEnquiry(location.state.enquiry);
    else if (params.id) {
      fetchEnquiry();
    }
    if (params.id) fetchFiles();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Enquiries" breadcrumbItem="Enquiry Info" />
        <Row>
          <Col lg={12}>
            <EnquiryComments
              enquiry={enquiry}
              onCommentChange={handleCommentChange}
              onAddComment={handleAddComment}
              newComment={newComment}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FileForm
              file={newFile}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              style={{ minHeight: "50vh" }}
            />
          </Col>
          <Col lg={6}>
            <FilesTable
              files={files}
              onDelete={handleFileDelete}
              onOpen={handleFileOpen}
            />
          </Col>
        </Row>
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default EnquiryInfo;
