import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Form } from "react-bootstrap";

const DigitalTracking = () => {
  const [digitalTrackings, setDigitalTrackings] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTab, setActiveTab] = useState("Hec");
  const [category, setCategory] = useState("");
  const [filteredTrackings, setFilteredTrackings] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/digital-tracking/${activeTab.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      setDigitalTrackings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/digital-tracking/${activeTab.toLowerCase()}/${trackingNumber}`);
      if (!response.ok) {
        throw new Error("Tracking not found");
      }
      const data = await response.json();
      setDigitalTrackings([data]);
    } catch (error) {
      console.log(error);
      setDigitalTrackings([]);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTrackByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/digital-tracking/${activeTab.toLowerCase()}/${category}`);
      if (!response.ok) {
        throw new Error("Tracking not found");
      }
      const data = await response.json();
      setFilteredTrackings([data]);
    } catch (error) {
      console.log(error);
      setFilteredTrackings([]);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "45px", display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
        <button onClick={() => handleTabChange("Hec")} style={{ padding: "25px 20px", fontSize: "16px", backgroundColor: activeTab === "Hec" ? "blue" : "#ccc", color: "#fff", border: "none", borderRadius: "14px", cursor: "pointer" }}>Hec Scholarship</button>
        <button onClick={() => handleTabChange("Freeship")} style={{ padding: "25px 20px", fontSize: "16px", backgroundColor: activeTab === "Freeship" ? "blue" : "#ccc", color: "#fff", border: "none", borderRadius: "14px", cursor: "pointer" }}>Freeship Scholarship</button>
        <button onClick={() => handleTabChange("Ehsaas")} style={{ padding: "25px 20px", fontSize: "16px", backgroundColor: activeTab === "Ehsaas" ? "blue" : "#ccc", color: "#fff", border: "none", borderRadius: "14px", cursor: "pointer" }}>Ehsaas Scholarship</button>
      </div>

      <Form.Group>
        <Row style={{marginTop:"60px", padding:"20px", marginLeft:"150px"}}> 
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="find by id"
              value={trackingNumber}
              onChange={handleInputChange}
            />
          </Col>
          <Col sm={3}>
            <Button onClick={handleSubmit}>Track</Button>
          </Col>
        </Row>
      </Form.Group>
      <br/>
      <br/>
    
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "70%", borderCollapse: "collapse", borderRadius: "10px" }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "blue", opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Student id</th>
              <th style={{ backgroundColor: "blue", opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Student name</th>
              <th style={{ backgroundColor: "blue",opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Father name</th>
              <th style={{ backgroundColor: "blue", opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Enrollment No</th>
              <th style={{ backgroundColor: "blue", opacity:"70%",color: "#fff", padding: "8px", border: "1px solid black" }}>Degree program</th>
              <th style={{ backgroundColor: "blue",opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Eligibility Scholarship</th>
              <th style={{ backgroundColor: "blue",opacity:"70%", color: "#fff", padding: "8px", border: "1px solid black" }}>Graduation year</th>
            </tr>
          </thead>
          <tbody>
            {(filteredTrackings.length > 0 ? filteredTrackings : digitalTrackings).map((tracking, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking._id}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.name}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.fatherName}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.enrollmentNo}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.degreeProgram}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.scholarshipavail || tracking.scholarshipavail|| tracking.scholarshipavail}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{tracking.graduationYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DigitalTracking;
