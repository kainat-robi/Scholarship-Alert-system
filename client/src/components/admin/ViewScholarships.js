import React, { useState, useEffect } from "react";
import { Container, Card, Col, Button, Modal, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewScholarships = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getScholarships();
  }, []);

  const getScholarships = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/get-scholarships`);
      setScholarships(data.scholarships);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = (index) => {
    setSelectedScholarship(index);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/get-scholarships/${scholarships[selectedScholarship]?._id}`
      );
      alert(data.message);
      navigate("/adminDashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTrackByCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/get-scholarships/category/${category}`);
      setScholarships(data.scholarships);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Container>
        <Form.Group>
          <Row style={{marginTop:"60px"}}> 
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder="find by category"
                value={category}
                onChange={handleCategoryChange}
              />
            </Col>
            <Col sm={6}>
              <Button onClick={handleTrackByCategory}>Track</Button>
            </Col>
          </Row>
        </Form.Group>
        <br />
        <br />
        <Row>
          {scholarships.map((item, index) => (
            <Col key={item._id} sm={12} md={4} style={{ padding: "20px" }}>
              <Card style={{ padding: "20px" }}>
                <h3>{item.scholarshipName}</h3>
                <br />
                <p>Deadline: {item.deadline}</p>
                <p>Amount: {item.amount}</p>
                <Button onClick={() => handleShow(index)}>View More</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {scholarships[selectedScholarship]?.scholarshipName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={3} className="modal-label">
                Id:
              </Col>
              <Col sm={9}>{scholarships[selectedScholarship]?._id}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Deadline:
              </Col>
              <Col sm={9}>{scholarships[selectedScholarship]?.deadline}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Amount:
              </Col>
              <Col sm={9}>{scholarships[selectedScholarship]?.amount}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Category:
              </Col>
              <Col sm={9}>{scholarships[selectedScholarship]?.category}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Eligibility:
              </Col>
              <Col sm={9}>
                {scholarships[selectedScholarship]?.eligibility}
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Documents Required:
              </Col>
              <Col sm={9}>
                {scholarships[selectedScholarship]?.documents}
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Note:
              </Col>
              <Col sm={9}>
                {scholarships[selectedScholarship]?.description}
              </Col>
            </Row>
            <br />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={`/update-scholarship/${scholarships[selectedScholarship]?._id}`}
          >
            <Button variant="primary">Update</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewScholarships;
