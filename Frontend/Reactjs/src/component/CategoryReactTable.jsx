import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const CategoryReactTable = ({ allCategory,handleDeleteClick, handleUpdateClick}) => {
    const columns = useMemo(
        () => [
            {
                name: 'Category Name',
                selector: row => row.nama_kategori,
                cell: (row) => row.nama_kategori,
            },
            {
                name: 'Budget',
                selector: row => formatterIDR.format(row.budget),
            },
            {
                name: 'Action',
                selector: row => row.id_kategori,
                cell: (row) => <><button className="btn btn-warning btn-sm" data-id={row.id_kategori} data-toggle="modal" data-target="#updatekategorimodal" onClick={() => handleUpdateClick(row.id_kategori)}>Update</button><button className="btn btn-danger btn-sm ml-2" data-id={row.id_kategori} data-toggle="modal" data-target="#deletekategorimodal" onClick={() => handleDeleteClick(row.id_kategori)}>Delete</button></>,
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
    )
}

export default CategoryReactTable
