import { useEffect, useState } from "react";
import { updateQuiz, addQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import QuestionEditor from "./Questions/QuestionEditor";
import * as courseClient from "../client";
import * as quizzesClient from "./client";
import { setQuestions } from "./Questions/reducer";
export default function QuizEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any | null>(
    qid !== "new"
      ? quizzes.find((q: any) => q._id === qid)
      : { course: cid, published: false }
  );
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";
    setQuiz({
      ...quiz,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSave = async (published: Boolean) => {
    const quizToSave = {
      ...quiz,
      published: published,
    };

    try {
      if (qid === "new") {
        const newQuiz = await courseClient.createQuizForCourse(
          cid as string,
          quizToSave
        );
        const newQuestions = await quizzesClient.updateAllQuestionsForQuiz(
          qid as string,
          questions
        )
        dispatch(setQuestions(newQuestions))
        dispatch(addQuiz(newQuiz));
        navigate(-1);
      } else {
        const updatedQuiz = await quizzesClient.updateQuiz(quizToSave);
        const updatedQuestions = await quizzesClient.updateAllQuestionsForQuiz(qid as string, questions)
        dispatch(setQuestions(updatedQuestions))
        dispatch(updateQuiz(updatedQuiz));
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

    const fetchQuestions = async () => {
      const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
      dispatch(setQuestions(questions));
  };

    useEffect(() => {
      fetchQuestions();
    }, []);
  
  return (
    <div className="container mt-4 border rounded p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5>Points: {quiz.points} </h5>
        <span
          className={`badge ${quiz.published ? "bg-success" : "bg-secondary"}`}
        >
          {quiz.published ? "Published" : "Not Published"}
        </span>
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <span
            className={`nav-link ${
              activeTab === "details" ? "active" : ""
            } cursor-pointer`}
            onClick={() => setActiveTab("details")}
            style={{ cursor: "pointer" }}
          >
            Details
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${
              activeTab === "questions" ? "active" : ""
            } cursor-pointer`}
            onClick={() => setActiveTab("questions")}
            style={{ cursor: "pointer" }}
          >
            Questions
          </span>
        </li>
      </ul>

      {activeTab === "details" ? (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Unnamed Quiz"
              name="title"
              value={quiz.title}
              onChange={handleChange}
            />
          </div>

          <textarea
            className="form-control"
            rows={3}
            placeholder="Quiz Instructions..."
            name="description"
            value={quiz.description}
            onChange={handleChange}
          ></textarea>
          <hr />

          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <label className="form-label">Quiz Type</label>
              <select
                className="form-select"
                name="quizType"
                value={quiz.quizType}
                onChange={handleChange}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Practice Survey</option>
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Assignment Group</label>
              <select
                className="form-select"
                name="assignmentGroup"
                value={quiz.assignmentGroup}
                onChange={handleChange}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Options</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="shuffleAnswers"
                name="shuffleAnswers"
                value={quiz.shuffleAnswers}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">
                Shuffle Answers
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="timeLimit"
                name="timeLimit"
                checked={quiz.timeLimit}
                onChange={handleChange}
              />
              <label className="form-check-label me-2" htmlFor="timeLimit">
                Time Limit
              </label>
              {quiz.timeLimit && (
                <>
                  <input
                    type="number"
                    name="timeLimitAmount"
                    value={quiz.timeLimitAmount}
                    onChange={handleChange}
                    className="form-control form-control-sm w-25 me-2"
                  />
                  <label className="input-label me-2">Minutes</label>
                </>
              )}
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="allowMultiple"
                name="multipleAttempts"
                checked={quiz.multipleAttempts}
                onChange={handleChange}
              />
              <label className="form-check-label me-2" htmlFor="allowMultiple">
                Allow Multiple Attempts
              </label>
              {quiz.multipleAttempts && (
                <>
                  <input
                    className="form-control form-control-sm w-25 me-2"
                    type="number"
                    name="howManyAttempts"
                    value={quiz.howManyAttempts}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label me-2"
                    htmlFor="allowMultiple"
                  >
                    Attempts
                  </label>
                </>
              )}
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="webcamRequired"
                name="webcamRequired"
                checked={quiz.webcamRequired}
                onChange={handleChange}
              />
              <label className="form-check-label me-2" htmlFor="webcamRequired">
                Webcam Required
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="lockQuestionsAfterAnswering"
                name="lockQuestionsAfterAnswering"
                checked={quiz.lockQuestionsAfterAnswering}
                onChange={handleChange}
              />
              <label
                className="form-check-label me-2"
                htmlFor="lockQuestionsAfterAnswering"
              >
                Lock Questions After Answering
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="oneQuestionAtATime"
                name="oneQuestionAtATime"
                checked={quiz.oneQuestionAtATime}
                onChange={handleChange}
              />
              <label
                className="form-check-label me-2"
                htmlFor="oneQuestionAtATime"
              >
                One Question At A Time
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="input-label me-2">Access Code</label>
            <input
              className="form-control w-25"
              name="accessCode"
              value={quiz.accessCode}
              onChange={handleChange}
            ></input>
          </div>
          <div className="mb-3">
            <div className="mb-2">
              <label className="form-label">Due</label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={quiz.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="row mb-2">
              <div className="col">
                <label className="form-label">Available From</label>
                <input
                  type="date"
                  className="form-control"
                  name="availableDate"
                  value={quiz.availableDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Until</label>
                <input
                  type="date"
                  className="form-control"
                  name="untilDate"
                  value={quiz.untilDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleSave(true)}
            >
              Save and Publish
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleSave(false)}
            >
              Save
            </button>
          </div>
        </>
      ) : (
          <QuestionEditor quiz={quiz} setQuiz={setQuiz} />
      )}
    </div>
  );
}
