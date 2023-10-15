import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";


const ViewBudget = () => {
    const [allKategori, setAllKategori] = useState([]);
    const username = Cookies.get("username");
    const [newCategory, setNewCategory] = useState({
        nama_kategori: "",
        budget: 0,
        username: username,
    });
    const [updateCategory, setUpdateCategory] = useState({
        nama_kategori: "",
        budget: 0,
        username: username,
    });

    const handleUpdateClick = (id_kategori, nama_kategori, budget) => {
        // Set the default values for updateCategory
        setUpdateCategory({
            id_kategori: id_kategori,
            nama_kategori: nama_kategori,
            budget: budget,
        });

        console.log(updateCategory);
    };

    const handleUpdateInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateCategory({ ...updateCategory, [name]: value });
    };

    const UpdateNewCategory = async (event) => {
        updateCategory.budget = parseInt(updateCategory.budget);
        event.preventDefault();
        try {
            const result = await axios.put(`http://localhost:5000/kategori/${updateCategory.id_kategori}`, updateCategory, { validateStatus: false });
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
        } catch (error) {
            console.error("Error adding outcome data:", error);
        }
    }


        useEffect(() => {
            loadKategori();
        }, []);

        const loadKategori = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/kategori/${username}`, { validateStatus: false });
                setAllKategori(result.data.data);
                console.log(result.data.data);
            } catch (error) {
                console.error("Error loading outcome data:", error);
            }
        }

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setNewCategory({ ...newCategory, [name]: value });
        };

        const AddNewCategory = async (event) => {
            console.log(newCategory);
            newCategory.budget = parseInt(newCategory.budget);
            event.preventDefault();
            try {
                const result = await axios.post(`http://localhost:5000/kategori`, newCategory, { validateStatus: false });
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
            } catch (error) {
                console.error("Error adding outcome data:", error);
            }
        }

        return (
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Kategori</h1>
                            </div>
                            <div className="container-fluid">
                                <div className="card shadow mb-4 mt-5">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary text-center">CATEGORY</h6>
                                    </div>
                                    <div className="card-body">
                                        <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#addkategorimodal">Add Category</button>
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>Nama Kategori</th>
                                                        <th>Budget</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allKategori && allKategori.map((kategori) => (
                                                        <tr key={kategori.id_kategori}>
                                                            <td>{kategori.nama_kategori}</td>
                                                            <td>{kategori.budget}</td>
                                                            <td style={{ width: '30%' }}>
                                                                <button className="m-1" data-id={kategori.id_kategori} id={kategori.id_kategori} name={kategori.id_kategori} data-toggle="modal" data-target="#updatekategorimodal" onClick={() => handleUpdateClick(kategori.id_kategori, kategori.nama_kategori, kategori.budget)}>Update</button>
                                                                <button data-id={kategori.id_kategori} id={kategori.id_kategori} name={kategori.id_kategori} data-toggle="modal" data-target="#deletekategorimodal">Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* add kategori Modal*/}
                <div className="modal fade" id="addkategorimodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={AddNewCategory}>
                                    <div className="form-group">
                                        <label htmlFor="nama_kategori">Nama Kategori</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nama_kategori"
                                            name="nama_kategori"
                                            value={newCategory.nama_kategori}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Budget</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="budget"
                                            name="budget"
                                            value={newCategory.budget}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                                    <button className="btn btn-secondary m-1 " type="button" data-dismiss="modal">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* add kategori Modal*/}
                <div className="modal fade" id="updatekategorimodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={UpdateNewCategory}>
                                    <div className="form-group">
                                        <label htmlFor="nama_kategori">Nama Kategori</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nama_kategori"
                                            name="nama_kategori"
                                            value={updateCategory.nama_kategori}
                                            onChange={handleUpdateInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_kategori">Id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="id_kategori"
                                            name="id_kategori"
                                            value={updateCategory.id_kategori}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Budget</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="budget"
                                            name="budget"
                                            value={updateCategory.budget}
                                            onChange={handleUpdateInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                                    <button className="btn btn-secondary m-1 " type="button" data-dismiss="modal">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default ViewBudget;
