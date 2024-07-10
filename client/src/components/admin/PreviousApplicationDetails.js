import React, { useState } from "react";

const DigitalTrackingForm = () => {
  const initialFormData = {
    name: "",
    fatherName: "",
    enrollmentNo: "",
    degreeProgram: "",
    scholarship: "",
    graduationYear: "",
    scholarshipavail: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = { ...formData };
      formDataToSend.scholarshipavail = formData.scholarshipavail; // Add this line to include scholarship eligibility
      
      let url = "";
      switch (formData.scholarship) {
        case "hec":
          url = "http://localhost:8080/digital-tracking/hec";
          break;
        case "freeship":
          url = "http://localhost:8080/digital-tracking/freeship";
          break;
        case "ehsaas":
          url = "http://localhost:8080/digital-tracking/ehsaas";
          break;
        default:
          url = "";
      }
      
      if (url !== "") {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formDataToSend)
        });
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name" style={{ fontWeight: "bold" }}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="fatherName" style={{ fontWeight: "bold" }}>Father's Name:</label>
        <input
          type="text"
          id="fatherName"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="enrollmentNo" style={{ fontWeight: "bold" }}>Enrollment No:</label>
        <input
          type="text"
          id="enrollmentNo"
          name="enrollmentNo"
          value={formData.enrollmentNo}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="degreeProgram" style={{ fontWeight: "bold" }}>Degree Program:</label>
        <input
          type="text"
          id="degreeProgram"
          name="degreeProgram"
          value={formData.degreeProgram}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="graduationYear" style={{ fontWeight: "bold" }}>Graduation Year:</label>
        <input
          type="number"
          id="graduationYear"
          name="graduationYear"
          value={formData.graduationYear}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="scholarshipavail" style={{ fontWeight: "bold" }}>Scholarship Eligibility:</label>
        <input
          type="text"
          id="scholarshipavail"
          name="scholarshipavail"
          value={formData.scholarshipavail}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        />
        <label htmlFor="scholarship" style={{ fontWeight: "bold" }}>Select Scholarship:</label>
        <select
          id="scholarship"
          name="scholarship"
          value={formData.scholarship}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
        >
          <option value="">Select Scholarship</option>
          <option value="hec">Hec</option>
          <option value="freeship">Freeship</option>
          <option value="ehsaas">Ehsaas</option>
        </select>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: "10px", width: "100%", backgroundColor: "#4caf50", color: "white", padding: "14px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
      </form>
    </div>
  );
};

export default DigitalTrackingForm;
