import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";


const initialState = {
  enrollments: enrollments,
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments.push({
        _id: courseId,
        user: userId,
        course: courseId,
      });
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
