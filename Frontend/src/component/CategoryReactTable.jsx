import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

const CategoryReactTable = ({
  allCategory,
  handleDeleteClick,
  handleUpdateClick,
}) => {
  const columns = useMemo(
    () => [
      {
        name: "Category Name",
        selector: (row) => row.nama_kategori,
        cell: (row) => row.nama_kategori,
      },
      {
        name: "Budget",
        selector: (row) => formatterIDR.format(row.budget),
        style: {
          paddingRight: '0px',
          marginLeft: '0px',
        },
        width: "40%",
      },
      {
        name: "Action",
        selector: (row) => row.id_kategori,
        width: "auto",
        cell: (row) => (
          <>
            <button
              className="btn btn-primary btn-sm"
              data-id={row.id_kategori}
              data-toggle="modal"
              data-target="#updatekategorimodal"
              onClick={() =>
                handleUpdateClick(
                  row.id_kategori,
                  row.nama_kategori,
                  row.budget
                )
              }
            >
              <i className="fas fa-edit" style={{ color: "#fff" }}></i>
            </button>
            <button
              className="btn btn-danger btn-sm ml-2"
              data-id={row.id_kategori}
              data-toggle="modal"
              data-target="#deletekategorimodal"
              onClick={() => handleDeleteClick(row.id_kategori)}
            >
              <i className="fas fa-trash" style={{ color: "#fff" }}></i>
            </button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={allCategory}
          noHeader
          fixedHeader
          fixedHeaderScrollHeight="300px"
          highlightOnHover
        />
      </div>
    </>
  );
};

export default CategoryReactTable;
