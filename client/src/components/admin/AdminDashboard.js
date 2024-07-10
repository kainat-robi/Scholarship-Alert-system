import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import AddScholarship from "./AddScholarship";
import AdminProfile from "./AdminProfile";
import ViewScholarships from "./ViewScholarships";
import StudentDetails from "./StudentDetails";
import PreviousApplicationDetails from "./PreviousApplicationDetails"

const AdminDashboard = () => {
  return (
    <>
    <Tabs
      defaultActiveKey="scholarships"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{height:"50px"}}
    >
      <Tab eventKey="scholarships" title="View Scholarships" style={{cursor:"pointer"}}>
        <ViewScholarships/>
      </Tab>
      <Tab eventKey="scholarship-form" title="Create Scholarships" style={{cursor:"pointer"}}>
        <AddScholarship/>
      </Tab>
      <Tab eventKey="student-details" title="Student Details" style={{cursor:"pointer"}}>
        <StudentDetails/>
      </Tab>
      <Tab eventKey="previous-details" title="Create all applicant status" style={{cursor:"pointer"}}>
        <PreviousApplicationDetails/>
      </Tab>
      <Tab eventKey="profile" title="Profile" style={{cursor:"pointer"}}>
        <AdminProfile/>
      </Tab>
    </Tabs>

    </>
  );
};

export default AdminDashboard;
