import logo from "./logo.svg";
import "./App.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";

function App() {
  const [ID, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [employee, setEmployee] = useState([]);
  const [visible, setVisible] = useState(false);
  const [rec, setrec] = useState();
  const emp = {
    ID: ID,
    FirstName: firstName,
    LastName: lastName,
    CompanyName: companyName,
    EmailId: emailId,
    PhoneNo: phoneNo,
  };
  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    axios
      .get("http://localhost:3400/employee")
      .then((response) => {
        setEmployee(response.data.recordsets[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  async function EditEmployee(emp) {
    setFirstName(emp.FirstName);
    setLastName(emp.LastName);
    setCompanyName(emp.CompanyName);
    setPhoneNo(emp.PhoneNo);
    setEmailId(emp.EmailId);
    setId(emp.ID);
  }

  async function Add(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3400/addemployee", {
        FirstName: firstName,
        LastName: lastName,
        CompanyName: companyName,
        EmailId: emailId,
        PhoneNo: phoneNo,
      });
      setFirstName("");
      setLastName("");
      setCompanyName("");
      setPhoneNo("");
      setEmailId("");
      Load();
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteEmployee(Id) {
    await axios.delete("http://localhost:3400/deleteemployee/" + Id);
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setPhoneNo("");
    setEmailId("");
    Load();
    console.log(Id);
  }

  async function UpdateEmployee(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3400/updateemployee/" + ID, {
        FirstName: firstName,
        LastName: lastName,
        CompanyName: companyName,
        EmailId: emailId,
        PhoneNo: phoneNo,
      });
      alert("student updated Successfully");
      setFirstName("");
      setLastName("");
      setCompanyName("");
      setPhoneNo("");
      setEmailId("");
      Load();
    } catch (error) {
      console.log(error);
    }
  }

  const statusTemplate = (employee) => {
    return (
      <>
        <Button
          label="Edit"
          severity="secondary"
          className=""
          onClick={() => {
            EditEmployee(employee);
          }}
        ></Button>

        <Button
          label="Delete"
          style={{ marginLeft: "0.5rem" }}
          severity="danger"
          onClick={() => {
            setVisible(true);
            setrec(employee.ID);
          }}
        ></Button>

        <Dialog
          header="Delete "
          visible={visible}
          style={{ width: "500px" }}
          onHide={() => setVisible(false)}
        >
          <p className="mb-5">
            Are You Sure You Want to delete this Employee Record ?
          </p>
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => {
                setVisible(false);
                DeleteEmployee(rec);
              }}
              autoFocus
            />
          </div>
        </Dialog>
      </>
    );
  };
  return (
    <>
      <div class="topnav" id="myTopnav">
        <a href="#home" class="active">
          Jeddah
        </a>
        <a href="#/Creditors">Creditors</a>
        <a href="#DebtBuyers">Debt Buyers</a>
        <a href="#Industries">Industries</a>
        <a href="#About">About</a>
        <a href="#Services">Services</a>
        <a href="#Contact">Contact</a>
      </div>
      {/* Form */}
      <div className="card">
        <div>
          <h1>Get Started Today</h1>
        </div>
        <div className="col-3">
          <label>First Name</label>
          <div className="field ">
            <InputText
              value={firstName}
              placeholder=" Enter FirstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <label>Last Name</label>
          <div className="field ">
            <InputText
              value={lastName}
              placeholder=" Enter LastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <label>Company Name</label>
          <div className="field ">
            <InputText
              value={companyName}
              placeholder=" Enter CompanyName"
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </div>

          <label>Email Id</label>
          <div className="field ">
            <InputText
              value={emailId}
              placeholder=" Enter EmailID"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </div>

          <label>Phone No</label>
          <div className="field ">
            <InputNumber
              placeholder=" Enter PhoneNo"
              value={phoneNo}
              onValueChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <br />

          <div>
            <Button
              label="Submit"
              className=""
              onClick={(e) => {
                if (emp.ID === 0) {
                  UpdateEmployee(e);
                } else {
                  Add(e);
                }
              }}
            ></Button>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        <DataTable value={employee} tableStyle={{ minWidth: "50rem" }}>
          <Column field="ID" header="No"></Column>
          <Column field="FirstName" header="FirstName"></Column>
          <Column field="LastName" header="LastName"></Column>
          <Column field="CompanyName" header="CompanyName"></Column>
          <Column field="EmailID" header="EmailID"></Column>
          <Column field="PhoneNo" header="PhoneNo"></Column>
          <Column header="Status" body={statusTemplate}></Column>
        </DataTable>
      </div>
    </>
  );
}

export default App;
