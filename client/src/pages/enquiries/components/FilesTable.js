import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
const PAGE_SIZE = 8;

const FilesTable = ({ files, onDelete, onOpen }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFilter("", { page: 1 });
  }, [files]);

  const handleFilter = (type, { page }) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const lastIndex = startIndex + PAGE_SIZE;
    const paged = files.slice(startIndex, lastIndex);
    setData(
      paged.filter((client) =>
        Object.keys(client).some((key) => client[key].toString().toLowerCase())
      )
    );
  };

  const columns = [
    {
      text: "File",
      dataField: "name",
      sort: true,
    },
    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, file) => (
        <ul className="list-inline font-size-20 contact-links mb-0">
          <li className="list-inline-item px-2">
            <i className="bx bx-export hand" onClick={() => onOpen(file._id)} />
          </li>
          <li className="list-inline-item px-2">
            <i
              className="bx bx-trash hand"
              onClick={() => onDelete(file._id)}
            />
          </li>
        </ul>
      ),
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-3">Attachments</CardTitle>
        <PaginationProvider
          pagination={paginationFactory({
            sizePerPage: PAGE_SIZE,
            totalSize: files.length,
            custom: true,
          })}
        >
          {({ paginationProps, paginationTableProps }) => (
            <ToolkitProvider
              keyField="_id"
              data={data}
              columns={columns}
              bootstrap4
            >
              {(toolkitProps) => (
                <>
                  <Row>
                    <Col xl="12">
                      <div
                        className="table-responsive"
                        style={{ minHeight: "50vh" }}
                      >
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
  );
};

export default FilesTable;
