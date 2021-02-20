import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "../../components/common/Breadcrumb";
import UsersTable from "./components/UsersTable";
import { getUsers, deleteUser } from "../../store/actions/userActions";

const AgencyUsers = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await getUsers(params.id);
      setUsers(result);
    };
    fetch();
  }, [params]);

  const handleDeleteAttemp = async (id) => {
    setSelectedUser(id);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    const result = await deleteUser(selectedUser);
    if (result) {
      setDeleteSuccessDialog(true);
      setUsers(users.filter((usr) => usr._id !== selectedUser));
      setSelectedUser("");
    }
    setDeleteDialog(false);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Agencies" breadcrumbItem="Users" />

          <UsersTable users={users} onDelete={handleDeleteAttemp} />

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

export default AgencyUsers;
