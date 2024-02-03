export const summaryBuilder = (questionnaires, global) => {
  let content = ``;
  content += `
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
    <p>${questionnaires?.appointment?.patient?.firstName + " " + questionnaires?.appointment?.patient?.lastName} - ${questionnaires?.appointment?.patient?.gender} - ${global?.calculateAge(questionnaires?.appointment?.patient?.dateOfBirth)}</p>
    <table border="1" style="border-collapse: collapse; width: 1256px; height: 212px">
    <tbody>
    <tr>
      <td style="width: 50%"><strong>Questionaire</strong>:&nbsp;L1-Triage,</td>
      <td style="width: 50%"><strong>DOB</strong>: ${questionnaires?.appointment?.patient?.dateOfBirth}<br /></td>
    </tr>
    <tr>
      <td style="width: 50%"><strong>Phone</strong>:  ${questionnaires?.appointment?.patient?.phoneNumber}<br /></td>
      <td style="width: 50%">
        <strong>Email</strong>:  ${questionnaires?.appointment?.patient?.email}<br />
      </td>
    </tr>
   </tbody>
  </table>
  <p><br /></p>
    `
  content += `
    <table border="1" style="border-collapse: collapse; width: 1289px; height: 111px">
    <tbody>`;
  questionnaires?.data?.forEach(x => {
    if (x?.answers[0]?.answerType === "radio" || x?.answers[0]?.answerType === "checkbox" || x?.answers[0]?.answerType === "text" || x?.answers[0]?.answerType === "number") {
      content += `
        <tr>
        <td style="width: 100%">
          <strong
            >${x?.questionName}<br />
            </strong>`;
      x?.answers?.forEach(y => {
        y?.value?.forEach(z => {
          content += `
        ${z}<br />`;
        })
      })
      content +=
        `
       </td>
      </tr>
       `;
    }
    else if (x?.answers[0]?.answerType === "images") {
      content += `
        <tr>
        <td style="width: 100%">
          <strong
            >${x?.questionName}<br />
            </strong>`;
      x?.answers?.forEach(y => {
        y?.value?.forEach(z => {
          console.log('z===>', z);
          if (isImage(z)) {
            content += `
           <img
        src="${z}"
        alt=""
        width="300px"
      /><br /><br />`;
          } else {
            content += `
            https://sss-g-server.vercel.app/api/v1/upload/questionnaire/${z}<br />  
            `;
          }

        })
      })
      content += `
       </td>
      </tr>
       `;
    }
  })
  content += `
    </tbody>
    </table>`;
  return content;
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function isImage(filename) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']; // Add more if needed

  const extension = getFileExtension(filename).toLowerCase();

  return imageExtensions.includes(extension);
}