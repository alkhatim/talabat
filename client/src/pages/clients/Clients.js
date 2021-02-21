import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "../../components/common/Breadcrumb";
import ClientsTable from "./components/ClientsTable";
import { getClients, deleteClient } from "../../store/actions/clientActions";

const Clients = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { clients } = useSelector((store) => store.clients);

  const [selectedClient, setSelectedClient] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

  useEffect(() => {
    dispatch(getClients());
  }, [params]);

  const handleDeleteAttemp = async (id) => {
    setSelectedClient(id);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    const result = await deleteClient(selectedClient);
    if (result) {
      setDeleteSuccessDialog(true);
      setSelectedClient("");
      dispatch({
        type: "CLIENTS_LOADED",
        payload: clients.filter((clnt) => clnt._id !== selectedClient),
      });
    }
    setDeleteDialog(false);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Clients" breadcrumbItem="Clients" />

          <ClientsTable clients={clients} onDelete={handleDeleteAttemp} />

          {/* Delete dialog */}
          {deleteDialog && (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={handleDelete}
              onCancel={() => {
                setDeleteDialog(false);
              }}
            >
              You won't be able to revert this!
            </SweetAlert>
          )}

          {deleteSuccessDialog && (
            <SweetAlert
              success
              title="Deleted Successfully"
              onConfirm={() => {
                setDeleteSuccessDialog(false);
              }}
            ></SweetAlert>
          )}
          {/* End of delete dialog */}
        </Container>
      </div>
    </>
  );
};

export default Clients;
