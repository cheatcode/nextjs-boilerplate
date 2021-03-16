import React from "react";
import PropTypes from "prop-types";

const Index = ({ prop1, prop2 }) => (
  <div>
    <button style={{ marginRight: "20px" }} className="button button-default">
      Testing
    </button>
    <button style={{ marginRight: "20px" }} className="button button-primary">
      Testing
    </button>
    <button style={{ marginRight: "20px" }} className="button button-success">
      Testing
    </button>
    <button style={{ marginRight: "20px" }} className="button button-warning">
      Testing
    </button>
    <button className="button button-danger">Testing</button>

    <div style={{ marginTop: "50px" }}>
      <div className="table striped">
        <table>
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Document Title</td>
              <td>Status</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>
                <button className="button button-primary button-sm">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#">Document Title</a>
              </td>
              <td>Status</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>
                <button className="button button-primary button-sm">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>Document Title</td>
              <td>Status</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>
                <button className="button button-primary button-sm">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#">Document Title</a>
              </td>
              <td>Status</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>
                <button className="button button-primary button-sm">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style={{ marginTop: "50px" }}>
      <div className="field">
        <label className="input-label">Back to Basics</label>
        <input type="text" className="input" placeholder="Type here..." />
        <p className="input-hint">Use at least six characters</p>
      </div>
      <div className="field">
        <label className="input-label">Back to Basics</label>
        <textarea className="input" placeholder="Testing here..." />
        <p className="input-hint error">Minimum length of six characters</p>
      </div>
      <div className="field">
        <label className="input-label">Back to Basics</label>
        <div className="select">
          <select>
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
            <option value="option-4">Option 4</option>
            <option value="option-5">Option 5</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="input-label">Back to Basics</label>
        <div className="select select-multiple">
          <select multiple>
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
            <option value="option-4">Option 4</option>
            <option value="option-5">Option 5</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="input-label">
          <input type="checkbox" /> Back to Basics
        </label>
        <label className="input-label">
          <input type="checkbox" /> Back to Basics
        </label>
        <label className="input-label">
          <input type="radio" /> Back to Basics
        </label>
        <label className="input-label">
          <input type="radio" /> Back to Basics
        </label>
      </div>
    </div>

    <div style={{ marginTop: "50px" }}>
      <div className="alert">
        <h6>
          <i className="fas fa-exclamation-triangle" /> Neutral
        </h6>
        <p>
          This could result in a serious problem if you continue. Make sure you
          know what you're doing.
        </p>
      </div>
      <div className="alert alert-warning">
        <h6>
          <i className="fas fa-exclamation-triangle" /> Warning!
        </h6>
        <p>
          This could result in a serious problem if you continue. Make sure you
          know what you're doing.
        </p>
      </div>
      <div className="alert alert-danger">
        <h6>
          <i className="fas fa-exclamation-triangle" /> Danger!
        </h6>
        <p>You could lose a hand using this!</p>
      </div>
      <div className="alert alert-success">
        <h6>
          <i className="fas fa-exclamation-triangle" /> Danger!
        </h6>
        <p>You could lose a hand using this!</p>
      </div>
      <div className="alert alert-info">
        <h6>
          <i className="fas fa-exclamation-triangle" /> Danger!
        </h6>
        <p>You could lose a hand using this!</p>
      </div>
    </div>

    <div style={{ marginTop: "50px" }}>
      <div className="blank-state dashed">
        <h5>No turkeys here, gobbler.</h5>
        <p>
          He still exists. He's just been severely tamped down by the insanity
          of the physical world.
        </p>
        <button className="button button-primary">Get Started</button>
      </div>
    </div>
  </div>
);

Index.propTypes = {};

export default Index;
