import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../assets/css/form.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from "react-icons/fa6";

const EditContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/contactms/update-contact/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Contact Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard");
        } else {
          toast.error("Failed to update contact", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating contact", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/contactms/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data && res.data.success) {
          setValues({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
          });
        } else {
          toast.error("Failed to fetch contact details", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching contact details", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="add-form-container">
        <form className="add-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          <div className="form-group">
            <FaUserPlus />
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <FaAt />
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <FaPhoneFlip />
            <input
              type="text"
              placeholder="Enter Phone"
              className="form-control"
              name="phone"
              value={values.phone}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <FaRegAddressCard />
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control"
              name="address"
              value={values.address}
              onChange={handleInput}
            />
          </div>
          <button className="form-btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditContact;
