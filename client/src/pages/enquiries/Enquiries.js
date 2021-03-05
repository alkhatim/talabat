import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/common/Breadcrumb";
import EnquiriesTable from "./components/EnquiriesTable";
import { getEnquiries } from "../../store/actions/enquiryActions";

const Enquiries = () => {
  const dispatch = useDispatch();

  const { enquiries } = useSelector((store) => store.enquiries);

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Enquiries" breadcrumbItem="All Enquiries" />
        <EnquiriesTable enquiries={enquiries} />
      </Container>
    </div>
  );
};

export default Enquiries;
