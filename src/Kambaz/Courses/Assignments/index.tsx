import AssignmentsControls from "./AssignmentsControls";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentTitleControlButtons from "./AssignmentTitleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPenToSquare, FaCaretDown } from "react-icons/fa6";
import { Link } from "react-router";
export default function Assignments() {
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
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                <Link to="123" className="text-success">
                  <FaPenToSquare />
                </Link>
              </div>
              <div>
                <strong>A1</strong>
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
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                <Link to="123" className="text-success">
                  <FaPenToSquare />
                </Link>
              </div>
              <div>
                <strong>A2</strong>
                <br />
                <small>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 13 at 12:00 am |
                  <br />
                  Due May 20 at 11:59pm | 100 pts
                </small>
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                <Link to="123" className="text-success">
                  <FaPenToSquare />
                </Link>
              </div>
              <div>
                <strong>A3</strong>
                <br />
                <small>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 20 at 12:00 am |
                  <br />
                  Due May 27 at 11:59pm | 100 pts
                </small>
              </div>

              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
