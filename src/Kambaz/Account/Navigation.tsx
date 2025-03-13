import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link
            to={"/Kambaz/Account/Signin"}
            className="list-group-item text-black active border border-0"
          >
            Signin
          </Link>
          <Link
            to={"/Kambaz/Account/Signup"}
            className="list-group-item text-danger border border-0"
          >
            Signup
          </Link>
        </>
      )}
      {currentUser && (
        <Link
          to={"/Kambaz/Account/Profile"}
          className="list-group-item text-danger border border-0"
        >
          Profile
        </Link>
      )}
    </div>
  );
}
