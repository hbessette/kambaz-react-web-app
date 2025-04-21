import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEye, FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import { setQuizzes } from "./reducer";
import * as userClient from "../../Account/client";
import { setQuizAttempts } from "./QuizAttempt/reducer";
import * as quizzesClient from "./client"
export default function QuizDetails() {
  const { qid, cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((q: any) => q._id == qid);
    const { quizAttempts } = useSelector((state: any) => state.quizAttemptReducer);
    const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const isInstructor = currentUser?.role !== "STUDENT";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [cid, dispatch]);

  const fetchQuizAttempts = async () => {
    const quizAttempts = await userClient.findQuizAttemptsForUser(
      currentUser._id,
      qid as string
    );
    dispatch(setQuizAttempts(quizAttempts));
  };
  useEffect(() => {
    fetchQuizAttempts();
  }, []);

    useEffect(() => {
      const fetchQuestions = async () => {
          const questions = await quizzesClient.findQuestionsForQuiz(
            qid as string
          );
          setQuestions(questions);
        }
      fetchQuestions();
    }, [quiz]);

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === quiz.accessCode) {
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Take`);
    } else {
      setAccessCodeError("Invalid access code. Please try again.");
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  if (!quiz) {
    return (
      <Card className="p-4 shadow-sm">
        <div className="text-center">
          <p>Loading quiz details...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">{quiz.title || "Untitled Quiz"}</h4>
        <div>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            <FaArrowLeft className="me-1" />
            Back
          </Button>
          {isInstructor && (
            <>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={togglePreviewMode}
              >
                <FaEye className="me-1" />
                {previewMode ? "Exit Preview" : "Preview"}
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)
                }
              >
                <FaPencilAlt className="me-1" />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>

      {quiz.description && (
        <div className="mb-4">
          <h5>Description</h5>
          <p className="text-muted">{quiz.description}</p>
        </div>
      )}

      {isInstructor && !previewMode ? (
        <Row>
          <Col sm={6}>
            <p>
              <strong>Quiz Type:</strong> {quiz.quizType}
            </p>
            <p>
              <strong>Points:</strong> {quiz.points}
            </p>
            <p>
              <strong>Assignment Group:</strong> {quiz.assignmentGroup}
            </p>
            <p>
              <strong>Shuffle Answers:</strong>{" "}
              {quiz.shuffleAnswers ? "Yes" : "No"}
            </p>
            <p>
              <strong>Time Limit:</strong>{" "}
              {quiz.timeLimit ? `${quiz.timeLimitAmount} Minutes` : "None"}
            </p>
            <p>
              <strong>Multiple Attempts:</strong>{" "}
              {quiz.multipleAttempts ? `${quiz.howManyAttempts}` : "No"}
            </p>
            <p>
              <strong>Show Correct Answers:</strong>{" "}
              {quiz.showCorrectAnswers ? "Yes" : "No"}
            </p>
          </Col>

          <Col sm={6}>
            <p>
              <strong>Access Code:</strong> {quiz.accessCode}
            </p>
            <p>
              <strong>One Question at a Time:</strong>{" "}
              {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </p>
            <p>
              <strong>Webcam Required:</strong>{" "}
              {quiz.webcamRequired ? "Yes" : "No"}
            </p>
            <p>
              <strong>Lock Questions After Answering:</strong>{" "}
              {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </p>

            <p>
              <strong>Due:</strong> {quiz.dueDate}
            </p>
            <p>
              <strong>Available From:</strong> {quiz.availableDate}
            </p>
            <p>
              <strong>Until:</strong> {quiz.untilDate}
            </p>
          </Col>
        </Row>
      ) : (
        <div>
          <div className="mb-4">
            <p>
              <strong>Quiz Type:</strong> {quiz.quizType}
            </p>
            <p>
              <strong>Points:</strong> {quiz.points}
            </p>
            <p>
              <strong>Time Limit:</strong>{" "}
              {quiz.timeLimit ? `${quiz.timeLimitAmount} Minutes` : "None"}
            </p>
            <p>
              <strong>Due:</strong> {quiz.dueDate}
            </p>
            <p>
              <strong>Available Until:</strong> {quiz.untilDate}
            </p>
          </div>

          {quiz.accessCode && (
            <div className="mb-4">
              <h5>This quiz requires an access code</h5>
              <Form onSubmit={handleAccessCodeSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Access Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code"
                    isInvalid={!!accessCodeError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {accessCodeError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </div>
          )}

          {!quiz.accessCode && (
            <Button
              variant="primary"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Take`)
              }
            >
              Take Quiz
            </Button>
          )}
        </div>
      )}
      {!isInstructor && quizAttempts.length > 0 && (
        <Card className="p-4 shadow-sm mt-4">
          <h5 className="mb-3">Your Quiz Attempt</h5>

          {quizAttempts[0] && (
            <>
              <p>
                <strong>Time Taken:</strong> {quizAttempts[0].timeTaken}
              </p>

              <p>
                <strong>Score:</strong> {quizAttempts[0].totalScore} /{" "}
                {quiz.points}
              </p>

              <h6 className="mt-4">Your Answers</h6>
              {quizAttempts[0].answers.map((a: any, index: number) => {
                const question: any = questions.find(
                  (q: any) => q._id === a.question
                );
                if (!question) return null;

                const isCorrect = a.pointsEarned > 0;

                return (
                  <Card key={index} className="p-3 mb-3">
                    <h6 className="mb-1">
                      {question.title || `Question ${index + 1}`}
                    </h6>
                    <p className="text-muted">{question.question}</p>
                    <p>
                      <strong>Your Answer:</strong>{" "}
                      <span
                        className={isCorrect ? "text-success" : "text-danger"}
                      >
                        {String(a.answer)}
                      </span>
                    </p>
                    <p>
                      <strong>Points Earned:</strong> {a.pointsEarned} /{" "}
                      {question.points}
                    </p>
                  </Card>
                );
              })}
            </>
          )}
        </Card>
      )}
    </Card>
  );
}
