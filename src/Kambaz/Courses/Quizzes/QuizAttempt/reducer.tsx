import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizAttempts: [],
};
const quizAttemptSlice = createSlice({
  name: "quizAttempts",
  initialState,
  reducers: {
    setQuizAttempts: (state, action) => {
      state.quizAttempts = action.payload;
    },

    addQuizAttempt: (state, { payload: quizAttempt }) => {
      const newQuizAttempt: any = {
          _id: quizAttempt._id,
          user: quizAttempt.user,
          quiz: quizAttempt.quiz,
          attemptNumber: quizAttempt.attemptNumber,
          totalScore: quizAttempt.totalScore,
          maxScore: quizAttempt.maxScore,
          answers: quizAttempt.answers,
          timeTaken: quizAttempt.timeTaken,
      };
      state.quizAttempts = [...state.quizAttempts, newQuizAttempt] as any;
    },
    deleteQuizAttempt: (state, { payload: quizId }) => {
      state.quizAttempts = state.quizAttempts.filter(
        (q: any) => q._id !== quizId
      );
    },
    updateQuizAttempt: (state, { payload: quiz }) => {
      state.quizAttempts = state.quizAttempts.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});
export const { setQuizAttempts, addQuizAttempt, deleteQuizAttempt, updateQuizAttempt} =
  quizAttemptSlice.actions;
export default quizAttemptSlice.reducer;
