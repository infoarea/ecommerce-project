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
import { createCategory } from "../../features/product/productApiSlice";

const Category = () => {
  const { error, message, category, loader } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();

  const { input, handleInputChange, resetForm } = UseFormField({
    name: "",
    parent: "",
    icon: "",
  });

  //Cat photo change handler
  const handleCatPhotoChange = (e) => {
    setPhotoPreview(e.target.files[0]);
  };

  //Category form submit
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

      {/* Create brand modal */}
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
                  <option value={catItem._id} key={index}>
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
        </div>
      </div>
    </>
  );
};

export default Category;
