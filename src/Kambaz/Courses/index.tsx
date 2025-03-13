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

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const course = useSelector((state: any) =>
    state.coursesReducer.courses.find((course: any) => course._id === cid)
  );

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (!isEnrolled && currentUser.role !== "FACULTY") {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

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
            <Route path="/People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
