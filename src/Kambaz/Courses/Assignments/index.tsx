import AssignmentsControls from "./AssignmentsControls";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentTitleControlButtons from "./AssignmentTitleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPenToSquare, FaCaretDown } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import * as db from "../../Database";
export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div>
      <div className="pb-4">
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
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
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
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 6 at 12:00 am |
                    <br />
                    Due May 13 at 11:59pm | 100 pts
                  </small>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
