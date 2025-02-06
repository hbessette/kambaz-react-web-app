import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="ms-3 d-flex flex-column">
      <h3>Signup</h3>
      <input placeholder="username" className="wd-username mb-3 form-control" />
      <input
        placeholder="password"
        type="password"
        className="wd-password mb-3 form-control"
      />
      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify mb-3 form-control"
      />
      <Button className="btn mb-3">
        <Link to="/Kambaz/Account/Profile" className="text-decoration-none text-light"> Sign up </Link>
      </Button>

      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
