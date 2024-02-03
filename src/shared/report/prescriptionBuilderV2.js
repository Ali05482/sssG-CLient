export const prescriptionBuilderV2 = (props, neWPrescription) => {
     return `
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
        <table border="1" style="border-collapse: collapse; width: 100%; height: 13px;">
        <tbody>
            <tr>
                <td style="width: 9.7561%"><br></td>
                <td style="width: 30.2439%"><br></td>
                <td style="width: 20%">
                    <img src="https://sss-g-client.vercel.app/_next/image?url=%2FFitwell-Hub-01.png&amp;w=3840&amp;q=75"
                        alt="logo">
                        <br>
                </td>
                <td style="width: 22.439%"><br></td>
                <td style="width: 17.561%">Created via Insig Health<br></td>
            </tr>
        </tbody>
    </table>
    <table border="1" style="border-collapse: collapse; width: 100%">
        <tbody>
            <tr>
                <td style="width: 100%; text-align: center">
                    &nbsp;<strong>Fitwell</strong><br>
                </td>
            </tr>
        </tbody>
    </table>
    <p><em>Prescription</em></p>
    <table border="1" style="border-collapse:collapse;width: 100%;">
        <tbody>
            <tr>
                <td style="width: 33.3333%;"><strong>Patient</strong>: ${props?.patient?.firstName + " " + props?.patient?.lastName + " " || ''} (${props?.patient?.gender || ''})</td>
                <td style="width: 33.3333%;"><strong>Date</strong>: ${new Date().toISOString().substr(0, 10)}</td>
                <td style="width: 33.3333%;"><strong>DOB</strong>: ${props?.patient?.dateOfBirth}</td>
            </tr>
            <tr>
                <td style="width: 33.3333%;"><strong>Health Card</strong>: ${props?.patient?.dateOfBirth || ''}</td>
                <td style="width: 33.3333%;"><strong>Phone</strong>: ${props?.patient?.phoneNumber || ''}</td>
                <td style="width: 33.3333%;"><strong>Weight</strong>: NA</td>
            </tr>
        </tbody>
    </table>
    <table border="1" style="border-collapse:collapse;width: 100%;">
        <tbody>
            <tr>
                <td style="width: 100%;"><strong>Address</strong>:&nbsp;  ${props?.patient?.address || "NA"}</td>
            </tr>
        </tbody>
    </table>
    <br/> <br/>
    <table border="1" style="border-collapse:collapse;width: 100%;">
        <tbody>
            <tr>
                <th style="width: 12.4643%; text-align: center;"><strong>Medication</strong></th>
                <th style="width: 63.7488%; text-align: center;">&nbsp; <strong>Dosage/Instructions</strong><br></th>
                <th style="width: 11.7031%; text-align: center;"><strong>Quantity</strong></th>
                <th style="width: 12.0837%; text-align: center;"><strong>Repeat</strong></th>
            </tr>
            ${neWPrescription?.map((x, index) => {
          return (
            `<tr>
                <td style="width: 12.6546%; text-align: center;"><span style="font-size: 12px;">${x?.medicineName}<br><strong>LU:&nbsp;</strong>${x?.luCode}</span></td>
                <td style="width: 63.6537%; text-align: center;">${x?.doseInstcruction}</td>
                <td style="width: 11.7983%; text-align: center;">${x?.quantity}</td>
                <td style="width: 11.7983%; text-align: center;">${x?.repeats}</td>
            </tr>`
          )
        }
        )}
            
            
        </tbody>
    </table>
    
    <br>
    <table border="1" style="border-collapse: collapse; width: 1237px; height: 104px">
        <tbody>
            <tr>
                <td style="width: 33.3333%">
                    <strong>Dr. ${props?.doctor?.firstName + " " + props?.doctor?.lastName || ''}<br><img
                            src="blob:http://localhost:3000/0ba0b69e-036a-4080-a478-fe84e7817b25"><br>Family
                        Doctor<br><br></strong>
                </td>
                <td style="width: 33.3333%">${props?.doctor?.address || ''}</td>
                <td style="width: 33.3333%">
                    <strong>License No</strong>. ${props?.doctor?.licenseNumber || ''}<br><strong>Phone</strong>:
                    ${props?.doctor?.phoneNumber || ''}<br><strong>Fax</strong>: 05546488
                </td>
            </tr>
        </tbody>
    </table>
    <p><br></p>
        `
}