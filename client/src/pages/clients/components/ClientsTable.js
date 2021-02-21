import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
const PAGE_SIZE = 8;

const ClientsTable = ({ clients, onDelete }) => {
  const role = useSelector((store) => store.auth.user.role);

  const [data, setData] = useState([]);

  useEffect(() => {
    handleFilter("", { page: 1, searchText: "" });
  }, [clients]);

  const { SearchBar } = Search;

  const handleFilter = (type, { page, searchText }) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const lastIndex = startIndex + PAGE_SIZE;
    const paged = clients.slice(startIndex, lastIndex);
    setData(
      paged.filter((client) =>
        Object.keys(client).some((key) =>
          client[key]
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      )
    );
  };

  const columns = [
    {
      dataField: "photo",
      text: "#",
      formatter: (cellContent, client) => (
        <>
          <div className="avatar-xs">
            <span className="avatar-title rounded-circle">
              {client.name.charAt(0)}
            </span>
          </div>
        </>
      ),
    },
    {
      text: "Name",
      dataField: "name",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
    },
    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, client) => (
        <ul className="list-inline font-size-20 contact-links mb-0">
          <li className="list-inline-item px-2">
            <Link
              to={{
                pathname: `/client/${client._id}`,
                state: { client },
              }}
            >
              <i className="bx bxs-edit" />
            </Link>
          </li>
          <li className="list-inline-item px-2">
            <i
              className="bx bx-trash hand"
              onClick={() => onDelete(client._id)}
            />
          </li>
        </ul>
      ),
    },
  ];

  if (role === "admin")
    columns.splice(3, 0, {
      dataField: "createdBy.username",
      text: "CreatedBy",
      sort: true,
    });

  return (
    <>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory({
                  sizePerPage: PAGE_SIZE,
                  totalSize: clients.length,
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

export default ClientsTable;
