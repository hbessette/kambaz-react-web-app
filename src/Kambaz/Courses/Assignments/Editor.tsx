import {
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
} from "react-bootstrap";
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormGroup controlId="wd-assignment-name" className="mb-3">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl type="text" value="A1" />
      </FormGroup>

      <FormGroup controlId="wd-description">
        <FormControl
          className="mb-3"
          rows={10}
          as="textarea"
          value="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section. Links to each of the lab assignments. Link to the Kambaz application. Links to all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page."
        />
      </FormGroup>
      <FormGroup controlId="wd-points" className="row mb-3">
        <FormLabel className="col-sm-2 col-form-label">Points</FormLabel>
        <div className="col-sm-10">
          <FormControl id="wd-points" type="number" value={100} />
        </div>
      </FormGroup>
      <FormGroup controlId="wd-group" className="row mb-3">
        <FormLabel className="col-sm-2 col-form-label">
          Assignment Group
        </FormLabel>
        <div className="col-sm-10">
          <FormSelect id="wd-group">
            <option selected value="ASSIGNMENTS">
              ASSIGNMENTS
            </option>
          </FormSelect>
        </div>
      </FormGroup>
      <FormGroup controlId="wd-display-grade-as" className="row mb-3">
        <FormLabel className="col-sm-2 col-form-label">
          Display Grade as
        </FormLabel>
        <div className="col-sm-10">
          <FormSelect id="wd-display-grade-as">
            <option selected value="PERCENTAGE">
              Percentage
            </option>
          </FormSelect>
        </div>
      </FormGroup>
      <FormGroup controlId="wd-submission-type" className="row mb-3">
        <FormLabel className="col-sm-2 col-form-label">
          Submission Type
        </FormLabel>
        <div className="col-sm-10">
          <div className="border rounded">
            <FormSelect className="m-4" id="wd-submission-type">
              <option selected value="ONLINE">
                Online
              </option>
            </FormSelect>
            <div className="ms-4">
              <FormLabel className="mb-3">Online Entry Options</FormLabel>
              <FormCheck className="mb-3">
                <FormCheck.Input type="checkbox" id="wd-text-entry" />
                <FormCheck.Label htmlFor="wd-text-entry">
                  Text Entry
                </FormCheck.Label>
              </FormCheck>
              <FormCheck className="mb-3">
                <FormCheck.Input type="checkbox" id="wd-website-url" />
                <FormCheck.Label htmlFor="wd-website-url">
                  Website URL
                </FormCheck.Label>
              </FormCheck>
              <FormCheck className="mb-3">
                <FormCheck.Input type="checkbox" id="wd-media-recordings" />
                <FormCheck.Label htmlFor="wd-media-recordings">
                  Media Recordings
                </FormCheck.Label>
              </FormCheck>
              <FormCheck className="mb-3">
                <FormCheck.Input type="checkbox" id="wd-student-annotation" />
                <FormCheck.Label htmlFor="wd-student-annotation">
                  Student Annotation
                </FormCheck.Label>
              </FormCheck>
              <FormCheck className="mb-3">
                <FormCheck.Input type="checkbox" id="wd-file-uploads" />
                <FormCheck.Label htmlFor="wd-file-uploads">
                  File Uploads
                </FormCheck.Label>
              </FormCheck>
            </div>
          </div>
        </div>
      </FormGroup>
      <FormGroup className="row mb-3">
        <FormLabel className="col-sm-2 col-form-label">Assign</FormLabel>
        <div className="col-sm-10">
          <div className="border rounded">
            <FormGroup className="m-4">
              <FormLabel>Assign to</FormLabel>
              <FormControl type="text" id="wd-assign-to" value="Everyone" />
            </FormGroup>
            <FormGroup className="m-4">
              <FormLabel>Due</FormLabel>
              <FormControl type="date" id="wd-due-date" />
            </FormGroup>
            <div className="row mb-3 m-3">
              <FormGroup className="w-50">
                <FormLabel>Available from</FormLabel>
                <FormControl type="date" id="wd-available-from" />
              </FormGroup>
              <FormGroup className="w-50">
                <FormLabel>Until </FormLabel>
                <FormControl type="date" id="wd-available-until" />
              </FormGroup>
            </div>
          </div>
        </div>
      </FormGroup>
      <hr />
      <div className="d-flex justify-content-end align-items-center">
        <Button id="wd-cancel" className="btn btn-secondary me-2">Cancel</Button>
        <Button id="wd-save" className="btn btn-danger me-2">Save</Button>
      </div>
    </div>
  );
}
