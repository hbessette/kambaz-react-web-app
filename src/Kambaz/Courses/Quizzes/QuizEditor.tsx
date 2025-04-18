export default function QuizEditor() {
    return (
      <div className="container mt-4 border rounded p-4 bg-white">
        <div className="d-flex justify-content-between mb-3">
          <h5>Points: 0</h5>
          <span className="badge bg-secondary">Not Published</span>
        </div>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <span className="nav-link active">Details</span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-danger">Questions</span>
          </li>
        </ul>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Unnamed Quiz"
          />
        </div>

                <textarea
            className="form-control"
            rows={3}
            placeholder="Quiz Instructions..."
          ></textarea>
        <hr />

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label">Quiz Type</label>
            <select className="form-select">
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Survey</option>
            </select>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Assignment Group</label>
            <select className="form-select">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Options</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="shuffleAnswers"
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="timeLimit"
            />
            <label className="form-check-label me-2" htmlFor="timeLimit">
              Time Limit
            </label>
            <input
              type="number"
              className="form-control form-control-sm w-25"
              placeholder="Minutes"
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="allowMultiple"
            />
            <label className="form-check-label" htmlFor="allowMultiple">
              Allow Multiple Attempts
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Assign</label>
          <div className="mb-2">
            <label className="form-label">Assign to</label>
            <select className="form-select">
              <option>Everyone</option>
              <option>Individual</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Due</label>
            <input type="date" className="form-control" />
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="form-label">Available From</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col">
              <label className="form-label">Until</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <button className="btn btn-light btn-sm">+ Add</button>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-danger">Save</button>
        </div>
      </div>
    );
}