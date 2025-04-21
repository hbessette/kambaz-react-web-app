import React, { useState } from "react";
import { Button, ListGroup, Dropdown } from "react-bootstrap";
import {
  FaCaretDown,
  FaEllipsisV,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaRegCheckSquare,
  FaBan,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import * as coursesClient from "../client";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";

export default function Quizzes() {
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>(
    {}
  );
const [attemptScores, setAttemptScores] = useState<Record<string, number>>({});
  const isInstructor = currentUser?.role !== "STUDENT";

const fetchQuizzes = async () => {
  const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
  dispatch(setQuizzes(quizzes));

  const scoreMap: Record<string, number> = {};
  const questionCounts: Record<string, number> = {};

  for (const quiz of quizzes) {
    const attempts = await userClient.findQuizAttemptsForUser(
      currentUser._id,
      quiz._id
    );

    if (attempts.length > 0) {
      const latestAttempt = attempts[attempts.length - 1];
      scoreMap[quiz._id] = latestAttempt.totalScore;
    } else {
      scoreMap[quiz._id] = 0;
    }

    const questions = await quizzesClient.findQuestionsForQuiz(quiz._id);
    questionCounts[quiz._id] = questions.length;
  }

  setAttemptScores(scoreMap);
  setQuestionCounts(questionCounts);
};

  const handleDelete = async (quizId: string) => {
    try {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublish = async (quiz: any) => {
    try {
      const updatedQuiz = await quizzesClient.updateQuiz({
        ...quiz,
        published: !quiz.published,
      });
      dispatch(updateQuiz(updatedQuiz));
      fetchQuizzes();
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const CustomToggle = React.forwardRef<any, any>(
    ({ children, onClick }, ref) => (
      <Button
        ref={ref}
        variant="link"
        className="text-secondary p-0 border-0"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <FaEllipsisV />
      </Button>
    )
  );

  const availability = (quiz: any) => {
    const currentDate = new Date();
    const availableFrom = new Date(quiz.availableDate);
    const availableUntil = new Date(quiz.untilDate);
    if (currentDate < availableFrom) {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    } else if (currentDate >= availableFrom && currentDate <= availableUntil) {
      return "Available";
    } else {
      return "Closed";
    }
  };

  const visibleQuizzes = isInstructor
    ? quizzes
    : quizzes.filter((quiz: any) => quiz.published);

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
        {isInstructor && (
          <>
            <Button
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new`)}
              variant="danger"
              className="me-1 float-end btn-md"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </Button>
            <Button variant="secondary" className="me-1 float-end btn-md">
              <FaEllipsisV />
            </Button>
          </>
        )}
      </div>
      <hr />
      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <FaCaretDown className="me-2" />
            <span className="font-weight-bold">Assignment Quizzes</span>
          </div>
          {visibleQuizzes.map((quiz: any) => (
            <ListGroup.Item
              key={quiz._id}
              className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
            >
              <div className="ms-2">
                <Link
                  to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                  className="text-decoration-none text-dark"
                >
                  <strong>{quiz.title}</strong>
                </Link>
                <br />
                <small>
                  {availability(quiz)} | Due: {quiz.dueDate} | Points:{" "}
                  {quiz.points} | Questions: {questionCounts[quiz._id] ?? "..."}{" "}
                  {currentUser.role == "STUDENT" && (
                    <>| Score: {attemptScores[quiz._id] ?? 0}</>
                  )}
                </small>
              </div>
              {isInstructor && (
                <div className="d-flex align-items-center">
                  {quiz.published ? (
                    <FaRegCheckSquare color="green" className="me-2" />
                  ) : (
                    <FaBan color="red" className="me-2" />
                  )}
                  <Dropdown align="end">
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)
                        }
                      >
                        <FaEdit className="me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handlePublish(quiz)}>
                        <FaCheck className="me-2" />
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDelete(quiz._id)}
                      >
                        <FaTrash className="me-2" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
