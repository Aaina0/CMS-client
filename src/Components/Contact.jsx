import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import "../assets/css/form.css";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      fontWeight: 500,
    },
  },
};

const MySwal = withReactContent(Swal);

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteRecord(row._id)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://cms-server-kappa.vercel.app/contactms/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.contacts);
        } else {
          console.error("Error fetching contacts:", res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        setLoading(false);
      });
  }, []);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://cms-server-kappa.vercel.app/contactms/contact/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              setContacts(contacts.filter((contact) => contact._id !== id));
              MySwal.fire({
                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success",
              });
            } else {
              MySwal.fire({
                title: "Error!",
                text: "Contact not found.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.error(
              "Error deleting contact:",
              err.response || err.message
            );
            MySwal.fire({
              title: "Error!",
              text: err.response
                ? err.response.data.message
                : "There was an issue deleting the contact.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <CircleLoader
            loading={loading}
            size={50}
            aria-label="loading-spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="contact-list">
          <h2 className="data-table-header">Contact List</h2>
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
            className="data-table"
          />
          {contacts.length === 0 && <h1>Add a Contact</h1>}
        </div>
      )}
    </>
  );
};

export default Contact;
