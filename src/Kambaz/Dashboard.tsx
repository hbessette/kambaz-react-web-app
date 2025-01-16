import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2>
        <hr />
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack Software Developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/phone.jpg" width={200} />
            <div>
              <h5>CS4520 Mobile Application Development</h5>
              <p className="wd-dashboard-course-title">
                Mobile Software Developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/laptop.jpg" width={200} />
            <div>
              <h5>CS3650 Computer Systems</h5>
              <p className="wd-dashboard-course-title">
                Khoury College Professor
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/city.jpg" width={200} />
            <div>
              <h5>HIST1232 History of Boston</h5>
              <p className="wd-dashboard-course-title">
                Boston Historian
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/data.jpg" width={200} />
            <div>
              <h5>CS3000 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Software Developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/java.jpg" width={200} />
            <div>
              <h5>CS3500 Object Oriented Design</h5>
              <p className="wd-dashboard-course-title">
                Java Developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/computation.jpg" width={200} />
            <div>
              <h5>CS3800 Theory of Computation</h5>
              <p className="wd-dashboard-course-title">
                Khoury College Professor
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    );
}