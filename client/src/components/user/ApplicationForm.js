import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyModal(props) {
  return (
    <div
      style={{
        display: props.show ? "block" : "none",
        position: "fixed",
        zIndex: "1",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fefefe",
          margin: "15% auto",
          padding: "20px",
          border: "1px solid #888",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={props.onHide}
          >
            &times;
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>Are you sure you want to cancel this form? </h4>
          <p>All of your input will be lost.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={props.onHide} style={{ marginRight: '10px' }}>
            Close
          </button>
          <a href="/scholarships">
            <button onClick={props.onHide}>Ok</button>
          </a>
        </div>
      </div>
    </div>
  );
}

const ApplicationForm = () => {
  const navigate = useNavigate();

  const [scholarshipName, setScholarshipName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [cnic, setCnic] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [income, setIncome] = useState("");
  const [incomeProof, setIncomeProof] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [uid, setUid] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [achievements, setAchievements] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [lor, setLor] = useState("");
  const [certificates, setCertificates] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !scholarshipName ||
      !category ||
      !amount ||
      !name ||
      !mobile ||
      !email ||
      !dob ||
      !age ||
      !gender ||
      !address ||
      !country ||
      !cnic ||
      !bankName ||
      !accountNumber ||
      !branch ||
      !income ||
      !incomeProof ||
      !universityName ||
      !uid ||
      !universityEmail ||
      !degree ||
      !cgpa ||
      !achievements ||
      !extracurricular ||
      !lor ||
      !certificates
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    try {
      const res = await axios.post(`http://localhost:8080/application-form`, {
        scholarshipName,
        category,
        amount,
        name,
        mobile,
        email,
        dob,
        age,
        gender,
        address,
        country,
        cnic,
        bankName,
        accountNumber,
        branch,
        income,
        incomeProof,
        universityName,
        uid,
        universityEmail,
        degree,
        cgpa,
        achievements,
        extracurricular,
        lor,
        certificates,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/");
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <MyModal show={modalShow} onHide={() => setModalShow(false)} />
      <Container>
        <div className="pd-20 card-box mb-30">
          <form onSubmit={handleSubmit}>
            <div className="clearfix">
              <h3 className="text-blue" style={{ color: "#2b50c7" }}>
                Application Form
              </h3>
            </div>
            {/* Scholarship Details */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Scholarship Name <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="scholarshipName"
                    className="form-control"
                    type="text"
                    placeholder="Scholarship Name"
                    value={scholarshipName}
                    onChange={(e) => setScholarshipName(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Category <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="category"
                    className="form-control"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Amount <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="amount"
                    className="form-control"
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Personal Details */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Name <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="name"
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Mobile Number <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={3}>
                  <input
                    name="mobile"
                    className="form-control"
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Email <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={5}>
                  <input
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Date of Birth <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={3}>
                  <input
                    name="dob"
                    className="form-control"
                    type="date"
                    placeholder="Select Date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Age <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={2}>
                  <input
                    name="age"
                    className="form-control"
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Gender <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={2}>
                  <select
                    name="gender"
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Col>
              </Row>
            </div>
            {/* Address */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Address <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="address"
                    className="form-control"
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Country <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="country"
                    className="form-control"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Adhar Card */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    CNIC <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="cnic"
                    className="form-control"
                    type="text"
                    placeholder="Enter CNIC number"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Bank Name <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="bankName"
                    className="form-control"
                    type="text"
                    placeholder="Enter Bank Name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Bank Account Number */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Bank Account Number{" "}
                    <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={3}>
                  <input
                    name="accountNumber"
                    className="form-control"
                    type="text"
                    placeholder="Enter Bank Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Branch <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={3}>
                  <input
                    name="branch"
                    className="form-control"
                    type="text"
                    placeholder="Enter Branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Income <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={1}>
                  <input
                    name="income"
                    className="form-control"
                    type="text"
                    placeholder="Enter Income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Income Proof */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Income Proof <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="incomeProof"
                    className="form-control"
                    type="file"
                    onChange={(e) => setIncomeProof(e.target.files[0])}
                  />
                </Col>
              </Row>
            </div>
            {/* University Name */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    University Name <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="collegeName"
                    className="form-control"
                    type="text"
                    placeholder="Enter University Name"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Unique Id */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    UID <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="uid"
                    className="form-control"
                    type="text"
                    placeholder="Enter UID number"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    Email<span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="collegeEmail"
                    className="form-control"
                    type="email"
                    placeholder="Enter University Email"
                    value={universityEmail}
                    onChange={(e) => setUniversityEmail(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Degree Details */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Degree <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="degree"
                    className="form-control"
                    type="text"
                    placeholder="Enter Degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <label className="col-form-label">
                    CGPA<span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={4}>
                  <input
                    name="cgpa"
                    className="form-control"
                    type="text"
                    placeholder="Enter CGPA"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {/* Achievements */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Achievements <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <textarea
                    name="achievements"
                    className="form-control"
                    placeholder="Enter Achievements"
                    rows="2"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                  ></textarea>
                </Col>
              </Row>
            </div>
            {/* Extra Curricular Activities */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Extra Curricular Activities{" "}
                    <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <textarea
                    name="extracurricular"
                    className="form-control"
                    placeholder="Enter Extra Curricular Activities"
                    rows="2"
                    value={extracurricular}
                    onChange={(e) => setExtracurricular(e.target.value)}
                  ></textarea>
                </Col>
              </Row>
            </div>
            {/* Letter of Recommendation */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Letter of Recommendation{" "}
                    <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="lor"
                    className="form-control"
                    type="file"
                    onChange={(e) => setLor(e.target.files[0])}
                  />
                </Col>
              </Row>
            </div>
            {/* Certificates */}
            <div className="form-group">
              <Row>
                <Col md={3}>
                  <label className="col-form-label">
                    Certificates <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col md={9}>
                  <input
                    name="certificates"
                    className="form-control"
                    type="file"
                    onChange={(e) => setCertificates(e.target.files[0])}
                  />
                </Col>
              </Row>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Submit
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setModalShow(true)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ApplicationForm;
