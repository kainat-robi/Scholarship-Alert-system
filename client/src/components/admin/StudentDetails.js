import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentDetails = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-applications");
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  return (
    <Container style={{marginTop:"70px"}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Scholarship Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.mobile}</td>
              <td>{application.scholarshipName}</td>
              <td>{application.status}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleViewDetails(application)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {selectedApplication?.name}</p>
          <p><strong>Email:</strong> {selectedApplication?.email}</p>
          <p><strong>Mobile:</strong> {selectedApplication?.mobile}</p>
          <p><strong>Scholarship Name:</strong> {selectedApplication?.scholarshipName}</p>
          <p><strong>Status:</strong> {selectedApplication?.status}</p>
          <p><strong>amount:</strong> {selectedApplication?.amount}</p>
          <p><strong>category:</strong> {selectedApplication?.category}</p>
          <p><strong>dob:</strong> {selectedApplication?.dob}</p>
          <p><strong>age:</strong> {selectedApplication?.age}</p>
          <p><strong>gender:</strong> {selectedApplication?.gender}</p>
          <p><strong>address:</strong> {selectedApplication?.address}</p>
          <p><strong>country:</strong> {selectedApplication?.country}</p>
          <p><strong>adharCard:</strong> {selectedApplication?.adharCard}</p>
          <p><strong>bankName:</strong> {selectedApplication?.bankName}</p>
          <p><strong>accountNumber:</strong> {selectedApplication?.accountNumber}</p>
          <p><strong>branch:</strong> {selectedApplication?.branch}</p>
          <p><strong>income:</strong> {selectedApplication?.income}</p>
          <p><strong>incomeProof:</strong> {selectedApplication?.incomeProof}</p>
          <p><strong>collegeName:</strong> {selectedApplication?.collegeName}</p>
          <p><strong>uid:</strong> {selectedApplication?.uid}</p>
          <p><strong>collegeEmail:</strong> {selectedApplication?.collegeEmail}</p>
          <p><strong>degree:</strong> {selectedApplication?.degree}</p>
          <p><strong>cgpa:</strong> {selectedApplication?.cgpa}</p>
          <p><strong>achievements:</strong> {selectedApplication?.achievements}</p>
          <p><strong>collegeName:</strong> {selectedApplication?.collegeName}</p>
          <p><strong>uid:</strong> {selectedApplication?.uid}</p>
          <p><strong>extracurricular:</strong> {selectedApplication?.extracurricular}</p>
          <p><strong>lor:</strong> {selectedApplication?.lor}</p>
          <p><strong>certificates:</strong> {selectedApplication?.certificates}</p>
          <p><strong>reason:</strong> {selectedApplication?.reason}</p>
          {/* Add other details here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentDetails;
