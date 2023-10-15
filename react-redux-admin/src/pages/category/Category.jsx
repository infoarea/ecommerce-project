import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import UseFormField from "../../hooks/UseFormField";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { createToast } from "../../utils/toast";
import { timeAgo } from "../../helper/timeAgo";
import swal from "sweetalert";

import { setMessageEmpty } from "../../features/product/productSlice";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../features/product/productApiSlice";

const Category = () => {
  const cols = [
    {
      name: "Category Photo",
      selector: (row) => (
        <img
          src={row.photo}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
          className="my-1"
          alt=""
        />
      ),
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Sub Category",
      selector: (row) => (
        <ol>
          {row.subCategory?.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ol>
      ),
    },
    {
      name: "Create At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div className="status-toggle">
            <input
              type="checkbox"
              id="status_1"
              className="check"
              checked={row.status}
            />
            <label htmlFor="status_1" className="checktoggle">
              checkbox
            </label>
          </div>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-sm bg-success-light"
            data-toggle="modal"
            data-target="#editCategoryModal"
            onClick={() => handleEditCategory(row._id)}>
            <i className="fe fe-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm bg-danger-light"
            onClick={() => handleDeleteCategory(row._id)}>
            <i className="fe fe-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const { error, message, category, loader } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const [categoryEdit, setCategoryEdit] = useState({});

  //Handle edit category
  const handleEditCategory = (id) => {
    const oldData = category.find((data) => data._id === id);
    setCategoryEdit(oldData);
  };

  //Handle Edit input change
  const handleEditInputChange = (e) => {
    setCategoryEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const { input, handleInputChange, resetForm } = UseFormField({
    name: "",
    parent: "",
    icon: "",
  });

  //Cat photo change handler
  const handleCatPhotoChange = (e) => {
    setPhotoPreview(e.target.files[0]);
  };

  //Edit Category Form submit
  const handleEditCategorySubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", categoryEdit.name);
    form_data.append("icon", categoryEdit.icon);
    form_data.append("parentCategory", categoryEdit.parent);

    dispatch(updateCategory({ id: categoryEdit._id, data: form_data }));
  };

  //Create Category form submit
  const handleCatFormSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("icon", input.icon);
    form_data.append("parentCategory", input.parent);
    form_data.append("catPhoto", photoPreview);

    dispatch(createCategory(form_data));
    resetForm();
    setPhotoPreview(null);
  };

  //Delete category handler
  const handleDeleteCategory = (id) => {
    swal({
      title: "Permission Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
        swal("Poof! Your permission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //Toaster message
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <PageHeader title="Category" />

      {/* Create Category modal */}
      <ModalPopup target="categoryModalPopup" title={"Add New Category"}>
        <form onSubmit={handleCatFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Parent Category</label>
            <select
              name="parent"
              value={input.parent}
              className="form-control"
              onChange={handleInputChange}>
              <option>--select--</option>
              {category?.map((catItem, index) => {
                return (
                  <option value={catItem?._id} key={index}>
                    {catItem.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Category Icon</label>
            <input
              type="text"
              className="form-control"
              name="icon"
              value={input.icon}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <img
              className="w-100"
              src={photoPreview && URL.createObjectURL(photoPreview)}
              alt=""
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Category Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={handleCatPhotoChange}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              {loader ? "Creating..." : "Add New Category"}
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* Edit Category modal */}
      {/* <ModalPopup target="editCategoryModal" title="Edit Brand">
        <form onSubmit={handleEditCategorySubmit}>
          <div className="my-3">
            <label htmlFor="">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={categoryEdit.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Parent Category</label>

            <select
              className="form-control"
              name="parent"
              onChange={handleEditInputChange}>
              <option>--select--</option>
              {category?.map((item, index) => {
                if (categoryEdit.parentCategory?.name === item?.name) {
                  return (
                    <option selected value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Category Icon</label>
            <input
              type="text"
              className="form-control"
              name="icon"
              value={categoryEdit?.icon}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <img
              className="w-100"
              src={
                photoPreview
                  ? URL.createObjectURL(photoPreview)
                  : categoryEdit.photo
              }
              alt=""
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Category Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={handleCatPhotoChange}
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary">
              {loader ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </ModalPopup> */}

      <ModalPopup target="editCategoryModal" title="Edit Brand">
        <form onSubmit={handleEditCategorySubmit}>
          <div className="my-3">
            <label htmlFor="">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={categoryEdit.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Parent Category</label>

            <select
              className="form-control"
              name="parent"
              onChange={handleInputChange}>
              <option>--select--</option>
              {category?.map((cat, index) => {
                if (categoryEdit.parentCategory?.name === cat?.name) {
                  return (
                    <option selected value={cat?._id} key={index}>
                      {cat.name}
                    </option>
                  );
                } else {
                  return (
                    <option value={cat?._id} key={index}>
                      {cat.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Category Icon</label>
            <input
              type="text"
              className="form-control"
              name="icon"
              value={categoryEdit.icon}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <img
              className="w-100"
              src={
                photoPreview
                  ? URL.createObjectURL(photoPreview)
                  : categoryEdit.photo
              }
              alt=""
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Category Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleCatPhotoChange(e)}
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary">
              {loader ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#categoryModalPopup"
            data-toggle="modal"
            className="btn btn-primary">
            Add New Category
          </button>
          <br />
          <br />

          <DataTable
            title="All Brands Data"
            className="shadow-sm rounded brand-table"
            data={category ? category : []}
            columns={cols}
            selectableRows
            pointerOnHover
            highlightOnHover
            pagination
            filtarable
            striped
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                style={{ width: "200px" }}
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Category;
