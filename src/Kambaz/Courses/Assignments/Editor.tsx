import React, { useState } from "react";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client.ts";
import * as coursesClient from "../client.ts";
export default function AssignmentEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState<any | null>(
    aid !== "new"
      ? assignments.find((a: any) => a._id === aid)
      : { course: cid }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!assignment.title) {
      alert("Please enter an assignment title");
      return;
    }
    if (!assignment.description) {
      alert("Please enter an assignment description");
      return;
    }
    if (!assignment.points) {
      alert("Please enter a number of points");
      return;
    }
    if (!assignment.dueDate) {
      alert("Please select a due date");
      return;
    }
    if (!assignment.availableFrom || !assignment.availableUntil) {
      alert("Please select availability dates");
      return;
    }

    if (aid === "new") {
      const newAssignment = await coursesClient.createAssignmentForCourse(cid as string, assignment);
      dispatch(addAssignment(newAssignment));
    } else {
      const newAssignment = await assignmentsClient.updateAssignment(assignment)
      dispatch(updateAssignment(newAssignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div className="p-4">
      <h2>{aid !== "new" ? "Edit Assignment" : "New Assignment"}</h2>
      <FormGroup className="mb-3">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          type="text"
          name="title"
          value={assignment.title}
          onChange={handleChange}
          placeholder="Enter assignment name"
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Description</FormLabel>
        <FormControl
          as="textarea"
          rows={5}
          name="description"
          value={assignment.description}
          onChange={handleChange}
          placeholder="Enter assignment description"
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Points</FormLabel>
        <FormControl
          type="number"
          name="points"
          value={assignment.points}
          onChange={handleChange}
          min={0}
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Due Date</FormLabel>
        <FormControl
          type="datetime-local"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Available From</FormLabel>
        <FormControl
          type="datetime-local"
          name="availableFrom"
          value={assignment.availableFrom}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Available Until</FormLabel>
        <FormControl
          type="datetime-local"
          name="availableUntil"
          value={assignment.availableUntil}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
