import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form, ProgressBar, Alert } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { setQuizzes } from "./reducer";
import * as userClient from "../../Account/client";
import {
  addQuizAttempt,
  setQuizAttempts,
  updateQuizAttempt,
} from "./QuizAttempt/reducer";
import * as quizAttemptClient from "./QuizAttempt/client";
export default function QuizTaker() {
  const { qid, cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const { quizAttempts } = useSelector(
    (state: any) => state.quizAttemptReducer
  );
  const quizAttempt = quizAttempts.find((q: any) => qid === q.quiz);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));

        const quizQuestions = await quizzesClient.findQuestionsForQuiz(
          qid as string
        );
        setQuestions(quizQuestions);

        const initialAnswers: Record<string, any> = {};
        quizQuestions.forEach((q: any) => {
          if (q.questionType === "Multiple Choice") {
            initialAnswers[q._id] = null;
          } else if (q.questionType === "True/False") {
            initialAnswers[q._id] = null;
          } else if (q.questionType === "Fill in the Blank") {
            initialAnswers[q._id] = "";
          }
        });
        setAnswers(initialAnswers);

        if (quiz?.timeLimit && quiz?.timeLimitAmount) {
          setTimeRemaining(quiz.timeLimitAmount * 60);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz. Please try again later.");
      }
    };

    fetchQuizData();
  }, [cid, qid, dispatch]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          calculateAndShowResults();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, quizCompleted]);

  useEffect(() => {
    if (timeRemaining === 0 && !quizCompleted) {
      calculateAndShowResults();
    }
  }, [timeRemaining, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateAndShowResults = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question._id];

      if (userAnswer === null || userAnswer === "") {
        return;
      }

      if (question.questionType === "Multiple Choice") {
        if (userAnswer.toString() === question.correctAnswer) {
          score += question.points || 1;
        }
      } else if (question.questionType === "True/False") {
        if (userAnswer.toString() === question.correctAnswer) {
          score += question.points || 1;
        }
      } else if (question.questionType === "Fill in the Blank") {
        const correctAnswers = Array.isArray(question.correctAnswers)
          ? question.correctAnswers
          : [question.correctAnswers];

        if (correctAnswers.includes(userAnswer)) {
          score += question.points || 1;
        }
      }
    });

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);
    const percentageScore = Math.round((score / totalPoints) * 100);
    console.log(percentageScore);
    console.log(totalPoints);
    console.log(score);
    setTotalPoints(score);
    setQuizScore(percentageScore);
    setQuizCompleted(true);
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      calculateAndShowResults();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddQuizAttempt = async (quizAttempt: any) => {
    const newQuizAttempt = await userClient.createQuizAttempt(
      currentUser._id,
      quiz._id,
      quizAttempt
    );
    return newQuizAttempt;
  };

  const handleUpdateQuizAttempt = async (quizAttempt: any) => {
    const newQuizAttempt = await quizAttemptClient.updateQuizAttempt(
      quizAttempt
    );
    return newQuizAttempt;
  };

  useEffect(() => {
    if (!quizCompleted) return;
    const attemptAnswers = questions.map((question) => {
      const userAnswer = answers[question._id];
      let pointsEarned = 0;
        if (userAnswer !== null && userAnswer !== "") {
            console.log(userAnswer)
            console.log(question.correctAnswer)
            console.log(question.correctAnswers)
        if (question.questionType === "Multiple Choice") {
          if (userAnswer.toString() === question.correctAnswer) {
            pointsEarned = question.points;
          }
        } else if (question.questionType === "True/False") {
          if (userAnswer.toString() === question.correctAnswer) {
            pointsEarned = question.points;
          }
        } else if (question.questionType === "Fill in the Blank") {
          const correctAnswers = Array.isArray(question.correctAnswers)
            ? question.correctAnswers
            : [question.correctAnswers];

          if (correctAnswers.includes(userAnswer)) {
            pointsEarned = question.points;
          }
        }
      }

      return {
        question: question._id,
        answer: userAnswer,
        pointsEarned,
      };
    });
    if (!quizAttempt) {
      const newQuizAttempt = handleAddQuizAttempt({
        user: currentUser._id,
        quiz: qid,
        attemptNumber: 1,
        totalScore: totalPoints,
        maxScore: totalPoints,
        answers: attemptAnswers,
        timeTaken: Date().toLocaleString(),
      });
      dispatch(addQuizAttempt(newQuizAttempt));
    } else {
      const newQuizAttempt = handleUpdateQuizAttempt({
        ...quizAttempt,
        attemptNumber: quizAttempt.attemptNumber + 1,
        totalScore: totalPoints,
        maxScore: Math.max(totalPoints!, quizAttempt.maxScore),
        answers: attemptAnswers,
        timeTaken: Date().toLocaleString(),
      });
      dispatch(updateQuizAttempt(newQuizAttempt));
    }
  }, [quizCompleted]);

  if (!quiz) {
    return (
      <Card className="p-4 shadow-sm">
        <div className="text-center">
          <p>Loading quiz...</p>
        </div>
      </Card>
    );
  }

  if (quizCompleted) {
    return (
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4">Quiz Results</h3>
        <div className="text-center mb-4">
          <h1
            className={
              quizScore && quizScore >= 70 ? "text-success" : "text-danger"
            }
          >
            {quizScore}%
          </h1>
          <p>Your score: {quizScore}%</p>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            <FaArrowLeft className="me-1" />
            Back to Quizzes
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`)
            }
          >
            View Quiz Details
          </Button>
        </div>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="p-4 shadow-sm">
        <div className="text-center">
          <p>Loading questions...</p>
        </div>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{quiz.title}</h4>
        {timeRemaining !== null && (
          <div className="text-danger fw-bold">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <ProgressBar now={progress} className="mb-4" />
      <div className="text-end mb-3">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      <div className="mb-4">
        <h5>{currentQuestion.title}</h5>
        <p className="text-muted">{currentQuestion.description}</p>

        {currentQuestion.questionType === "Multiple Choice" && (
          <div>
            {currentQuestion.choices.map((answer: string, index: number) => (
              <Form.Check
                key={index}
                type="radio"
                id={`answer-${index}`}
                label={answer}
                name={`question-${currentQuestion._id}`}
                checked={answers[currentQuestion._id] === index}
                onChange={() => handleAnswerChange(currentQuestion._id, index)}
                className="mb-2"
              />
            ))}
          </div>
        )}

        {currentQuestion.questionType === "True/False" && (
          <div>
            <Form.Check
              type="radio"
              id="true"
              label="True"
              name={`question-${currentQuestion._id}`}
              checked={answers[currentQuestion._id] === true}
              onChange={() => handleAnswerChange(currentQuestion._id, true)}
              className="mb-2"
            />
            <Form.Check
              type="radio"
              id="false"
              label="False"
              name={`question-${currentQuestion._id}`}
              checked={answers[currentQuestion._id] === false}
              onChange={() => handleAnswerChange(currentQuestion._id, false)}
              className="mb-2"
            />
          </div>
        )}

        {currentQuestion.questionType === "Fill in the Blank" && (
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            value={answers[currentQuestion._id] || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion._id, e.target.value)
            }
          />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <FaArrowLeft className="me-1" />
          Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            variant="primary"
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNextQuestion}>
            Next
            <FaArrowRight className="ms-1" />
          </Button>
        )}
      </div>
    </Card>
  );
}
