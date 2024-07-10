import React, { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { BiCommentAdd, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

function ScholarshipAlerts() {
  const [scholarshipData, setScholarshipData] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch("http://localhost:8080/get-scholarships");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setScholarships(data.scholarships);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };
    fetchScholarships();
  }, []);

  const getScholarshipById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/get-scholarship/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setScholarshipData(data.scholarship);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < scholarships.length - 1) {
      setCurrentIndex(currentIndex + 1);
      getScholarshipById(scholarships[currentIndex + 1]._id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      getScholarshipById(scholarships[currentIndex - 1]._id);
    }
  };

  return (
    <div
      style={{
        marginTop: "80px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "blue",
          justifyContent: "center",
          width: "80%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center" }}> Alerts</h1>
      </div>
      <div style={{ marginTop: "40px", backgroundColor: "lightgray", width: "80%", gap: "10px" }}>
        <table>
          <tbody>
            <tr>
              <td style={{ padding: "10px 20px" }}>
                <FaExclamationTriangle style={{ color: "red", marginRight: "10px" }} />Alerts
              </td>
              <td
                style={{
                  padding: "10px 20px",
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  marginLeft: "750px",
                }}
              >
                <BiCommentAdd
                  onClick={() => {
                    getScholarshipById(scholarships[currentIndex]._id);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {scholarshipData && (
        <div style={{ marginTop: "20px", width: "80%", border: "1px solid black", padding: "10px" }}>
          <h2>{scholarshipData.scholarshipName}</h2>
          <p>Deadline: {scholarshipData.deadline}</p>
          <p>Amount: {scholarshipData.amount}</p>
          <p>Category: {scholarshipData.category}</p>
          <p>Eligibility: {scholarshipData.eligibility}</p>
          <p>Documents: {scholarshipData.documents}</p>
          <p>Description: {scholarshipData.description}</p>
          <div style={{ marginTop: "10px" }}>
            <Link to="/application-form">
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Apply Now
              </button>
            </Link>
          </div>
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <BiChevronLeft onClick={handlePrevious} style={{ cursor: "pointer" }} />
            <BiChevronRight onClick={handleNext} style={{ cursor: "pointer" }} />
          </div>
        </div>
      )}
    </div>
  );
}
export default ScholarshipAlerts;
