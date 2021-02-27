import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
const PAGE_SIZE = 8;

const EnquiriesTable = ({ enquiries }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFilter("", { page: 1, searchText: "" });
  }, [enquiries]);

  const { SearchBar } = Search;

  const handleFilter = (type, { page, searchText }) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const lastIndex = startIndex + PAGE_SIZE;
    const paged = enquiries.slice(startIndex, lastIndex);
    setData(
      paged.filter((enquiry) =>
        Object.keys(enquiry).some((key) =>
          enquiry[key]
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      )
    );
  };

  const columns = [
    {
      dataField: "client",
      text: "Client",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "contactMethod",
      text: "Contact Method",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
    },
    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, enquiry) => (
        <ul className="list-inline font-size-20 contact-links mb-0">
          <li className="list-inline-item px-2">
            <Link
              to={{
                pathname: `/enquiry/${enquiry._id}/info`,
                state: { enquiry },
              }}
            >
              <i className="bx bx-detail" />
            </Link>
          </li>
          <li className="list-inline-item px-2">
            <Link
              to={{
                pathname: `/enquiry/${enquiry._id}`,
                state: { enquiry },
              }}
            >
              <i className="bx bxs-edit" />
            </Link>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory({
                  sizePerPage: PAGE_SIZE,
                  totalSize: enquiries.length,
                  custom: true,
                })}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="_id"
                    data={data}
                    columns={columns}
                    bootstrap4
                    search
                  >
                    {(toolkitProps) => (
                      <>
                        <Row className="mb-2">
                          <Col sm="4">
                            <div className="search-box mr-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={"table table-centered table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                                onTableChange={handleFilter}
                                {...paginationTableProps}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-center mb-2 inner-custom-pagination">
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EnquiriesTable;
