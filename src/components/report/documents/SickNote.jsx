import React, { useContext, useEffect, useRef } from "react";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";

const SickNote = (props) => {
  const daysBetween = useRef(0);
  const startDate = useRef();
  const endDate = useRef();
  const global = useContext(MainContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    props?.setSickNote({ ...props?.sickNote, [name]: value });
    daysBetween.current.value = Math.floor(
      (new Date(endDate.current.value) - new Date(startDate.current.value)) /
        (1000 * 60 * 60 * 24)
    );
  };
  const handleSickNote = () => {
    if (daysBetween?.current?.value < 1) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Date Range",
        text: "Please select a valid date range,  You cannot select a date range less than 1 day",
      });
    }
    const content = `
        <style>
        table {
          border-collapse: collapse;
          width: 1238px;
          height: 11px;
        }
        
        td {
          border: 1px solid #ccc; /* Add a solid border with a light gray color */
          padding: 8px; /* Add some padding for better spacing */
        }
        
        img {
          max-width: 100%; /* Ensure the image does not exceed the container width */
          height: auto; /* Maintain the aspect ratio of the image */
          display: block; /* Remove any extra spacing below the image */
          margin: 0 auto; /* Center the image within its container */
        }
        
        td:last-child {
          font-style: italic; /* Make the text in the last column italic */
        }
        </style>
      <table border="1" style="border-collapse: collapse; width: 1238px; height: 11px">
       <tbody>
    <tr>
      <td style="width: 9.7561%"><br /></td>
      <td style="width: 30.2439%"><br /></td>
      <td style="width: 20%">
        <img
          src="https://sss-g-client.vercel.app/_next/image?url=%2FFitwell-Hub-01.png&amp;w=3840&amp;q=75"
          alt="logo"
        /><br />
      </td>
      <td style="width: 22.439%"><br /></td>
      <td style="width: 17.561%">Created via Insig Health<br /></td>
    </tr>
  </tbody>
</table>
<table border="1" style="border-collapse: collapse; width: 100%">
  <tbody>
    <tr>
      <td style="width: 100%; text-align: center">
        &nbsp;<strong>Fitwell</strong><br />
      </td>
    </tr>
  </tbody>
</table>
<p><em>Medical Certificate</em></p>
<table border="1" style="border-collapse: collapse; width: 100%">
  <tbody>
    <tr>
      <td style="width: 50%"><strong>Name</strong>: ${
        props?.patient?.firstName + " " + props?.patient?.lastName || ""
      }</td>
      <td style="width: 50%"><strong>Date</strong>: ${new Date()
        .toISOString()
        .substr(0, 10)}</td>
    </tr>
    <tr>
      <td style="width: 50%"><strong>Address</strong>: ${
        props?.patient?.address || ""
      }</td>
      <td style="width: 50%"><strong>Phone</strong>:${
        props?.patient?.phoneNumber || ""
      }</td>
    </tr>
  </tbody>
</table>
<p><br /></p>
<p>
  <em
    ><strong
      >For medical reasons, the above patient is unable to attend
      work/school.</strong
    ></em
  >
</p>
<table border="1" style="border-collapse: collapse; width: 100%">
  <tbody>
    <tr>
      <td style="width: 50%"><strong>FROM</strong>: ${
        props?.sickNote?.startDate || ""
      }</td>
      <td style="width: 50%"><strong>TO</strong>: ${
        props?.sickNote?.endDate || ""
      }<br /></td>
    </tr>
  </tbody>
</table>
<p><em>Comments:</em></p>
<table border="1" style="border-collapse: collapse; width: 1227px; height: 95px">
  <tbody>
    <tr>
      <td style="width: 100%"><br /></td>
    </tr>
  </tbody>
</table>
<p><em>Thank you</em>,</p>
<p><br /></p>
<table border="1" style="border-collapse: collapse; width: 1237px; height: 104px">
  <tbody>
    <tr>
      <td style="width: 33.3333%">
        <strong
          >Dr. ${
            props?.doctor?.firstName + " " + props?.doctor?.lastName || ""
          }<br /><img
            src="data:image/png;base64,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" /><br />Family
          Doctor<br /><br
        /></strong>
      </td>
      <td style="width: 33.3333%">${props?.doctor?.address || ""}</td>
      <td style="width: 33.3333%">
        <strong>License No</strong>. ${
          props?.doctor?.licenseNumber || ""
        }<br /><strong>Phone</strong>:
        ${props?.doctor?.phoneNumber || ""}<br /><strong>Fax</strong>: 05546488
      </td>
    </tr>
  </tbody>
</table>
<p>
  <em
    >By accepting this medical certificate you also consent to the verification
    of its authenticity, as and when necessary</em
  >.
</p>

           `;
    props?.setSickNote({ ...props?.sickNote, data: content });
    props?.setIsModalOpen(!props?.isModalOpen);
  };
  useEffect(() => {
    daysBetween.current.value = Math.floor(
      (new Date(endDate.current.value) - new Date(startDate.current.value)) /
        (1000 * 60 * 60 * 24)
    );
  }, []);

  return (
    <>
      <div className="container">
        <div className="form-group">
          <label htmlFor="">
            <b>From Date</b>
          </label>
          <input
            ref={startDate}
            style={{
              backgroundColor: global?.theme?.backgroundColor,
              color: global?.theme?.inputColor,
            }}
            value={props?.sickNote?.startDate || props?.getCurrentDate()}
            defaultValue={props?.sickNote?.startDate || props?.getCurrentDate()}
            onChange={handleChange}
            type="date"
            className="form-control"
            name="startDate"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">
            <b>To Date</b>
          </label>
          <input
            style={{
              backgroundColor: global?.theme?.backgroundColor,
              color: global?.theme?.inputColor,
            }}
            ref={endDate}
            value={props?.sickNote?.endDate || props?.getCurrentDate()}
            defaultValue={
              new Date(Date.now() + 86400000).toISOString().split("T")[0]
            }
            onChange={handleChange}
            type="date"
            className="form-control"
            name="endDate"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Set minimum date to
          />
        </div>
        <div className="form-group">
          <label htmlFor="">
            <b>Days Between</b>
          </label>
          <input
            style={{
              backgroundColor: global?.theme?.backgroundColor,
              color: global?.theme?.inputColor,
            }}
            type="number"
            disabled
            ref={daysBetween}
            className="form-control"
          />
        </div>
        <div className="form-group my-3">
          <button
            onClick={handleSickNote}
            type="button"
            className="btn btn-primary"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default SickNote;
