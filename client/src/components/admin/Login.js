import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import AdminRegistrationImage from "../../images/userRegistration.jpg";

const AdminLogin = () => {
  const { setLoggedIn, setUser, setAdminLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/adminlogin`, {
        email,
        password,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token); // Store token in localStorage
        setLoggedIn(false);
        setAdminLoggedIn(true);
        setUser({ email: email });
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("adminLoggedIn", true);
        // Remove the incorrect usage of user
        localStorage.setItem("user", JSON.stringify({ email: email }));
        navigate("/adminDashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(`Something went wrong `);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={AdminRegistrationImage} alt="Admin Login" />
          </Col>
          <Col>
            <Form onSubmit={PostData} method="POST">
              <h2 style={{ textAlign: "center" }}> Admin Login</h2>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control"
                />
              </Form.Group>
              <Button type="submit">LOGIN</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
