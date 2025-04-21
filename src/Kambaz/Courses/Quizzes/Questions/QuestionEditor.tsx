import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  updateQuestion,
} from "./reducer";
import {
  Button,
  Card,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router";
const QUESTION_TYPES = ["Multiple Choice", "True/False", "Fill in the Blank"];
import { v4 as uuidv4 } from "uuid";
export default function QuestionEditor({
  quiz,
  setQuiz,
}: {
  quiz: any;
    setQuiz: any;
}) {
  const dispatch = useDispatch();
  const { qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const calculateTotalPoints = () => {
    return questions.reduce(
      (total: number, question: any) => total + Number(question.points),
      0
    );
  };

  const updatePoints = () => {
    setQuiz({ ...quiz, points: calculateTotalPoints() });
  };

  const handleNewQuestion = () => {
    const question = {
      _id: uuidv4(),
      quiz: qid,
      title: "",
      question: "",
      points: 1,
      questionType: "Multiple Choice",
      choices: [],
      answers: [],
      correctAnswer: "",
      editing: true,
    };
    dispatch(addQuestion(question));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    question: any
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";
    dispatch(
      updateQuestion({
        ...question,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      })
    );
  };

  const handleTypeChange = (type: string, question: any) => {
    dispatch(
      updateQuestion({
        ...question,
        questionType: type,
        choices: type === "Multiple Choice" ? [] : null,
        answers: type === "Fill in the Blank" ? [] : null,
        correctAnswer: type === "Multiple Choice" ? "" : null,
      })
    );
  };

  const handleAnswerChange = (index: number, value: string, question: any) => {
    const newChoices = [...(question.choices || [])];
    newChoices[index] = value;
    const updatedQuestion = {
      ...question,
      choices: newChoices,
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleCorrectAnswerChange = (index: number, question: any) => {
    const updatedQuestion = {
      ...question,
      correctAnswer: index.toString(),
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleAddAnswer = (question: any) => {
    const updatedQuestion = {
      ...question,
      choices: [...(question.choices || []), ""],
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleDeleteAnswer = (index: number, question: any) => {
    const newChoices = [...(question.choices || [])];
    newChoices.splice(index, 1);
    const updatedQuestion = {
      ...question,
      choices: newChoices,
      correctAnswer:
        question.correctAnswer === index.toString()
          ? ""
          : question.correctAnswer > index.toString()
          ? (parseInt(question.correctAnswer) - 1).toString()
          : question.correctAnswer,
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleFillInBlankAnswerChange = (
    index: number,
    value: string,
    question: any
  ) => {
    const newAnswers = [...(question.answers || [])];
    newAnswers[index] = value;
    const updatedQuestion = {
      ...question,
      answers: newAnswers,
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleAddFillInBlankAnswer = (question: any) => {
    const updatedQuestion = {
      ...question,
      answers: [...(question.answers || []), ""],
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleDeleteFillInBlankAnswer = (index: number, question: any) => {
    const newAnswers = [...(question.answers || [])];
    newAnswers.splice(index, 1);
    const updatedQuestion = {
      ...question,
      answers: newAnswers,
    };
    dispatch(updateQuestion(updatedQuestion));
  };

  const handleSave = (question: any) => {
    dispatch(updateQuestion({ ...question, editing: false }));
    updatePoints();
  };

  const handleCancel = (question: any) => {
    dispatch(updateQuestion({ ...question, editing: false }));
  };

  const handleEdit = (question: any) => {
    dispatch(editQuestion(question._id));
  };

  const handleDeleteQuestion = (questionId: any) => {
    dispatch(deleteQuestion(questionId));
  };


  return (
    <div>
      <div className="text-center mb-3">
        <Button variant="light" className="border" onClick={() => handleNewQuestion()}>
          + New Question
        </Button>
      </div>

      <hr />

      {questions.map((question: any) => (
        <Card className="p-3 mb-4">
          {question.editing ? (
            <>
              <div className="d-flex justify-content-between mb-2">
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="border">
                    {question.questionType}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {QUESTION_TYPES.map((type) => (
                      <Dropdown.Item
                        key={type}
                        onClick={() => handleTypeChange(type, question)}
                      >
                        {type}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    style={{ width: "60px" }}
                    name="points"
                    value={question.points}
                    onChange={(e) => handleChange(e, question)}
                    min="1"
                  />
                  <small className="text-muted ms-1">pts</small>
                </div>
              </div>

              <Form.Control
                className="mb-2"
                placeholder="Enter question title..."
                name="title"
                value={question.title}
                onChange={(e) => handleChange(e, question)}
              />

              <Form.Control
                className="mb-2"
                as="textarea"
                rows={3}
                placeholder="Enter your question..."
                name="question"
                value={question.question}
                onChange={(e) => handleChange(e, question)}
              />

              {question.questionType === "Multiple Choice" && (
                <>
                  {question.choices?.map((ans: string, idx: number) => (
                    <InputGroup className="mb-2" key={idx}>
                      <InputGroup.Text
                        onClick={() => handleCorrectAnswerChange(idx, question)}
                        style={{
                          backgroundColor:
                            question.correctAnswer === idx.toString()
                              ? "#d4edda"
                              : "white",
                          cursor: "pointer",
                        }}
                      >
                        {question.correctAnswer === idx.toString() ? "✅" : ""}
                      </InputGroup.Text>
                      <Form.Control
                        placeholder={`Answer ${idx + 1}`}
                        value={ans}
                        onChange={(e) =>
                          handleAnswerChange(idx, e.target.value, question)
                        }
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteAnswer(idx, question)}
                        disabled={question.choices.length <= 1}
                      >
                        ×
                      </Button>
                    </InputGroup>
                  ))}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => handleAddAnswer(question)}
                  >
                    + Add Answer
                  </Button>
                </>
              )}

              {question.questionType === "True/False" && (
                <Form.Select
                  value={question.correctAnswer}
                  onChange={(e) => handleChange(e, question)}
                  name="correctAnswer"
                >
                  <option value="">Select correct answer</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              )}

              {question.questionType === "Fill in the Blank" && (
                <>
                  {question.answers?.map((ans: string, idx: number) => (
                    <InputGroup className="mb-2" key={idx}>
                      <Form.Control
                        placeholder={`Correct answer ${idx + 1}`}
                        value={ans}
                        onChange={(e) =>
                          handleFillInBlankAnswerChange(
                            idx,
                            e.target.value,
                            question
                          )
                        }
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() =>
                          handleDeleteFillInBlankAnswer(idx, question)
                        }
                        disabled={question.answers.length <= 1}
                      >
                        ×
                      </Button>
                    </InputGroup>
                  ))}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => handleAddFillInBlankAnswer(question)}
                  >
                    + Add Answer
                  </Button>
                </>
              )}

              <div className="d-flex justify-content-between mt-3">
                <Button variant="light" onClick={() => handleCancel(question)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleSave(question)}>
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{question.title || <i>Untitled</i>}</h5>
                <p className="text-muted">
                  {question.questionType} • {question.points} pts
                </p>
                <p>{question.question}</p>
              </div>
              <div>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => handleEdit(question)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
