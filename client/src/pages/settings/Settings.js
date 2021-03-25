import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Breadcrumbs from "../../components/common/Breadcrumb";
import CategoriesTable from "./components/CategoriesTable";
import CategoriesForm from "./components/CategoriesForm";
import Rates from "./components/Rates";
import {
  getCategories,
  updateRates,
  createCategory,
  deleteCategory,
  getRates,
} from "../../store/actions/configActions";
import messages from "../../services/messages";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [rates, setRates] = useState({
    USD2SDG: "",
    USD2AED: "",
    USD2SAR: "",
    AED2SDG: "",
    AED2SAR: "",
    SAR2SDG: "",
  });
  const [selectedCategory, setselectedCategory] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const categoriesData = await getCategories();
      if (categoriesData) setCategories(categoriesData);
      const ratesData = await getRates();
      if (ratesData) setRates(ratesData);
    };
    fetch();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleRatesChange = (e) => {
    setRates({ ...rates, [e.target.name]: e.target.value });
  };

  const handleCategoryCreate = async () => {
    const result = await createCategory(category);
    if (result) {
      setCategory({ name: "" });
      messages.success("Added Successfully");
      setCategories(categories.concat(result));
    }
  };

  const handleRatesUpdate = async () => {
    const result = await updateRates(rates);
    if (result) {
      messages.success("Updated Successfully");
      setRates(result);
    }
  };

  const handleDeleteAttemp = async (id) => {
    setselectedCategory(id);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    const result = await deleteCategory(selectedCategory);
    if (result) {
      setDeleteSuccessDialog(true);
      setselectedCategory("");
      setCategories(categories.filter((cat) => cat._id !== selectedCategory));
    }
    setDeleteDialog(false);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Settings" breadcrumbItem="Settings" />

          <Row>
            <Col lg={6}>
              <Row>
                <CategoriesForm
                  category={category}
                  onCategoryChange={handleCategoryChange}
                  onCreate={handleCategoryCreate}
                />
              </Row>
              <Row>
                <Rates
                  rates={rates}
                  onRatesChange={handleRatesChange}
                  onUpdate={handleRatesUpdate}
                />
              </Row>
            </Col>
            <Col lg={6}>
              <CategoriesTable
                categories={categories}
                onDelete={handleDeleteAttemp}
              />
            </Col>
          </Row>

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

export default Settings;
