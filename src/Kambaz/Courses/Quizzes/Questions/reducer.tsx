import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: question._id,
        quiz: question.quiz,
        title: question.title,
        points: question.points,
        question: question.question,
        questionType: question.questionType,
        correctAnswer: question.correctAnswer,
        choices: question.choices,
        correctAnswers: question.correctAnswers,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },

    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },

    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? {...q, ...question} : q
      ) as any;
    },

    editQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === questionId ? { ...q, editing: true } : q
      ) as any;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  editQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;
