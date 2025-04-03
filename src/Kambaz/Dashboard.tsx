import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "./Courses/reducer";
import {
  toggleShowAllCourses,
  enrollInCourse,
  unenrollFromCourse,
  setEnrollments,
} from "./Courses/enrollmentsReducer";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllCourses } = useSelector(
    (state: any) => state.enrollmentsReducer
  );
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const isFaculty = currentUser.role === "FACULTY";

  const [course, setCourse] = useState({
    _id: "RS101",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const handleEnrollToggle = async (courseId: string) => {
    if (isEnrolled(courseId)) {
      const status = await userClient.unenrollUserFromCourse(
        courseId as string
      );
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } else {
      const enrollment = await userClient.enrollUserInCourse(courseId as string);
      dispatch(enrollInCourse(enrollment));
    }
  };

  const handleAddCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    dispatch(addCourse(newCourse));
  };

  const handleDeleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(updateCourse(course));
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await userClient.findEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => dispatch(toggleShowAllCourses())}
          className="mb-2"
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any, index: any) => (
            <Col
              key={index}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Card.Img
                  src="/images/reactjs.jpg"
                  variant="top"
                  width="100%"
                  height={160}
                />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {isEnrolled(course._id) && (
                        <Link
                          to={`/Kambaz/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none"
                        >
                          <Button variant="primary">Go</Button>
                        </Link>
                      )}
                    </div>
                    <div>
                      {isFaculty && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            id="wd-edit-course-click"
                            onClick={() => setCourse(course)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            id="wd-delete-course-click"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      <Button
                        variant={isEnrolled(course._id) ? "danger" : "success"}
                        size="sm"
                        onClick={() => handleEnrollToggle(course._id)}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
