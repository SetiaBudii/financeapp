import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import TableKategori from "../component/CategoryReactTable";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const ViewBudget = () => {
  const [allKategori, setAllKategori] = useState([]);
  const username = Cookies.get("username");
  const [newCategory, setNewCategory] = useState({
    nama_kategori: "",
    budget: "",
    username: username,
  });
  const [updateCategory, setUpdateCategory] = useState({
    id_kategori: "", // Added id_kategori
    nama_kategori: "",
    budget: "",
    username: username,
  });

  // Add this function to your code
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateCategory({ ...updateCategory, [name]: value });
  };

  const [deleteCategory, setDeleteCategory] = useState({
    id_kategori: "",
  });

  const handleUpdateClick = (id_kategori, nama_kategori, budget) => {
    // Set the default values for updateCategory
    setUpdateCategory({
      id_kategori: id_kategori,
      nama_kategori: nama_kategori,
      budget: budget,
    });
  };

  const handleDeleteClick = (id_kategori) => {
    // Set the default values for updateCategory
    setDeleteCategory({
      id_kategori: id_kategori,
    });
  };

  const DeleteCategory = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.delete(
        `http://localhost:5005/kategori/${deleteCategory.id_kategori}`,
        { validateStatus: false }
      );

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.msg,
        });
        loadKategori();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.msg,
        });
      }
      $("#deletekategorimodal").modal("hide");
    } catch (error) {
      console.error("Error adding outcome data:", error);
    }
  };

  const UpdateNewCategory = async (event) => {
    updateCategory.budget = parseInt(updateCategory.budget);
    event.preventDefault();
    try {
      const result = await axios.put(
        `http://localhost:5005/kategori/${updateCategory.id_kategori}`,
        updateCategory,
        { validateStatus: false }
      );
      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.msg,
        });
        loadKategori();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.msg,
        });
      }
      $("#updatekategorimodal").modal("hide");
    } catch (error) {
      console.error("Error updating category data:", error);
    }
  };

  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/kategori/${username}`,
        { validateStatus: false }
      );
      setAllKategori(result.data.data);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };

  const handleDeleteClickk = (id_kategori) => {
    // Set the default values for updateCategory
    setDeleteCategory({
      id_kategori: id_kategori,
    });
  };

  const handleUpdateClickk = (id_kategori, nama_kategori, budget) => {
    // Set the default values for updateCategory
    setUpdateCategory({
      id_kategori: id_kategori,
      nama_kategori: nama_kategori,
      budget: budget,
    });
  };

  const AddNewCategory = async (event) => {
    newCategory.budget = parseInt(newCategory.budget);
    event.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:5005/kategori`,
        newCategory,
        { validateStatus: false }
      );
      if (result.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.msg,
        });
        loadKategori();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.msg,
        });
      }
      $("#addkategorimodal").modal("hide");
    } catch (error) {
      console.error("Error adding outcome data:", error);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Category</h1>
            </div>
            <div className="card shadow mb-4 mt-5">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  CATEGORY
                </h6>
              </div>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary mb-4"
                  data-toggle="modal"
                  data-target="#addkategorimodal"
                >
                  Add Category
                </button>
                <TableKategori
                  allCategory={allKategori}
                  handleDeleteClick={handleDeleteClick}
                  handleUpdateClick={handleUpdateClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add kategori Modal*/}
      <div
        className="modal fade"
        id="addkategorimodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Category
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={AddNewCategory}>
                <div className="form-group">
                  <label htmlFor="nama_kategori">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_kategori"
                    name="nama_kategori"
                    value={newCategory.nama_kategori}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Budget</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text rounded-0">Rp.</span>
                    <input
                      type="number"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      id="budget"
                      name="budget"
                      value={newCategory.budget}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                    <span class="input-group-text rounded-0">.00</span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* update kategori Modal*/}
      <div
        className="modal fade"
        id="updatekategorimodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Category
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={UpdateNewCategory}>
                <div className="form-group">
                  <label htmlFor="update_nama_kategori">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="update_nama_kategori"
                    name="nama_kategori"
                    value={updateCategory.nama_kategori}
                    onChange={handleUpdateInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="update_id_kategori"
                    name="id_kategori"
                    value={updateCategory.id_kategori}
                    hidden={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update_budget">Budget</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text rounded-0">Rp.</span>
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      id="update_budget"
                      name="budget"
                      value={updateCategory.budget}
                      onChange={handleUpdateInputChange}
                      placeholder="0"
                      required
                    />
                    <span className="input-group-text rounded-0">.00</span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* delete kategori Modal*/}
      <div
        className="modal fade"
        id="deletekategorimodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Category
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={DeleteCategory}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="id_kategori"
                    name="id_kategori"
                    value={deleteCategory.id_kategori}
                    hidden={true}
                  />
                </div>
                <p>Are you sure want to delete this category?</p>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBudget;
