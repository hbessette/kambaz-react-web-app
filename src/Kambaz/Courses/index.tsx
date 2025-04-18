import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as coursesClient from "./client";
import { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = useSelector((state: any) =>
    state.coursesReducer.courses.find((course: any) => course._id === cid)
  );
  const [users, setUsers] = useState < any[] >([])
  const fetchUsers = async () => {
    try {
      const users = await coursesClient.findUsersForCourse(cid as string)
      setUsers(users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Modules" element={<Modules />} />
            <Route path="/Assignments" element={<Assignments />} />
            <Route path="/Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="/People" element={<PeopleTable users={users} />} />
            <Route path="/Quizzes" element={<Quizzes />} />
            <Route path="/Quizzes/:qid" element={<QuizEditor/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
