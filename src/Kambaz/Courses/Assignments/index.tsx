import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, Modal, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentTitleControlButtons from "./AssignmentTitleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPenToSquare, FaCaretDown } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleDelete = (assignmentId: string, assignmentTitle: string) => {
    setAssignmentToDelete({ id: assignmentId, title: assignmentTitle });
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete.id));
    }
    setShowConfirmDialog(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div>
      <div className="pb-4 d-flex justify-content-between align-items-center">
        <AssignmentsControls />
      </div>
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2" />
            <span className="font-weight-bold">ASSIGNMENTS</span>
            <AssignmentTitleControlButtons />
          </div>
          {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
              <ListGroup.Item
                key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
              >
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-success"
                  >
                    <FaPenToSquare />
                  </Link>
                </div>
                <div>
                  <strong>{assignment.title}</strong>
                  <br />
                  <small>
                    Due {new Date(assignment.dueDate).toLocaleString()} |{" "}
                    {assignment.points} pts
                    <br />
                    Available from{" "}
                    {new Date(
                      assignment.availableFrom
                    ).toLocaleString()} until{" "}
                    {new Date(assignment.availableUntil).toLocaleString()}
                  </small>
                </div>
                <LessonControlButtons
                  onDelete={() =>
                    handleDelete(assignment._id, assignment.title)
                  }
                />
              </ListGroup.Item>
            ))}
        </ListGroup.Item>
      </ListGroup>

      {/* Confirmation Dialog */}
      <Modal show={showConfirmDialog} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the assignment "
          {assignmentToDelete?.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
