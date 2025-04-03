import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  enrollments: [],
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: enrollment._id,
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {

      state.enrollments = state.enrollments.filter((e: any) => !(e._id === userId && e.course === courseId));
    },
  },
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
