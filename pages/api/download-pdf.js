// In pages/api/download-pdf.js
import htmlToPdf from 'html-pdf';

export default async function handler(req, res) {
  const { htmlString } = JSON.parse(req.body);

  try {
    const pdfBuffer = await htmlToPdf.create(htmlString);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
}
