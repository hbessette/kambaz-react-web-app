import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentsControls() {
    return (
      <div id="wd-assignments-group-btn" className="d-flex">
            <div className="d-flex float-start w-50 me-auto input-group">
                <span className="input-group-text"><FaSearch/></span>
          <input
            type="search"
            placeholder="Search..."
            className="form-control"
          />
        </div>

        <Button
          variant="secondary"
          className="float-end me-1 btn-md"
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        <Button
          variant="danger"
          className="me-1 float-end btn-md"
          id="wd-assignments-add-assignments-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>
    );
}
