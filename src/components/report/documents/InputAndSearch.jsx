import React, { useState } from "react";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChanger = (e) => {
    const value = e?.target?.value?.trim();
    setInputValue(value);

    // Show dropdown if input is not empty
    setShowDropdown(value.length > 0);
  };

  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor=""></label>
        <input
          className="form-control"
          id="query"
          name="query"
          type="text"
          data-toggle="dropdown"
          placeholder="Enter value..."
          value={inputValue}
          onChange={handleInputChanger}
          style={{ borderRadius: "0" }}
        />
      </div>
      <div className="dropdown" style={{ position: "relative" }}>
        {showDropdown && (
          <ul
            className="dropdown-menu"
            role="menu"
            aria-labelledby="query"
            style={{
              borderRadius: "0 0 0.25rem 0.25rem",
              display: "block",
              position: "absolute",
              top: "100%",
              left: "0",
              right: "0",
              backgroundColor: "#fff",
              border: "1px solid #ced4da",
              borderTop: "none",
              borderRadius: "0 0 0.25rem 0.25rem",
              animation: "slideDown 0.3s ease",
            }}
          >
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 1
              </a>
            </li>
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 2
              </a>
            </li>
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 3
              </a>
            </li>
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 4
              </a>
            </li>
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 5
              </a>
            </li>
            <li>
              <a
                className="dropdown-item result"
                href="#"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Firstname 6
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
