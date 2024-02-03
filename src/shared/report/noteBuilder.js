export const noteBuilder = (note, sickNote, prescription, summary, referral, requisition) => {
    return `
      <p><strong>Triage</strong></p>
<ul>
    <li>last visit with a doctor more than 6 months ago</li>
</ul><br>
<table style="border-collapse: collapse; width: 100.078%;">
    <tbody>
        <tr>
            <td style="width: 100%; text-align: center;" colspan="2"><strong>Patient Profile<br></strong></td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Body Temperature (°F):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.bodyTemperature || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Heart Rate (bpm):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.heartRate || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Respiratory Rate (breaths per minute):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.respiratoryRate || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Blood Pressure (mmHg):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.bloodPressure || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Oxygen Saturation (%):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.oxygenSaturation || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Height (inches):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.height || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;">Weight (lbs):<br></td>
            <td style="width: 14.3192%;">${note?.vitals?.weight || ''}</td>
        </tr>
        <tr>
            <td style="width: 85.6808%;"><span style="color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;">Blood Glucose (mg/dL):</span><br></td>
            <td style="width: 14.3192%;">${note?.vitals?.bloodGlucose || ''}<br></td>
        </tr>
    </tbody>
</table>
<br>
      ${summary || ''} <br>
      ${sickNote || ''} <br>
      ${prescription || ''} <br>
      ${referral || ''} <br>
      ${requisition || ''} <br>
      `
}