import { Button, ListGroup } from "react-bootstrap";
import { FaCaretDown, FaEllipsisV, FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Quizzes() {
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    return (
      <div>
        <div className="pb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex float-start w-50 me-auto input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="form-control"
            />
          </div>
          <Button variant="danger" className="me-1 float-end btn-md">
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
          <Button variant="secondary" className="me-1 float-end btn-md">
            <FaEllipsisV />
          </Button>
        </div>
        <hr />
        <ListGroup className="rounded-0" id="wd-quizzes">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <FaCaretDown className="me-2" />
              <span className="font-weight-bold">Assignment Quizzes</span>
            </div>
            {quizzes.map((quiz: any) => (
              <ListGroup.Item
                key={quiz._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
              >
                <div>
                  <strong>{quiz.title}</strong>
                  <br />
                  <small>

                  </small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
}