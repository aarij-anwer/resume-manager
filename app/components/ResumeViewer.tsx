import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';

const ResumeViewer: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  // Fetch the markdown file
  useEffect(() => {
    fetch('/resume.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  // Convert HTML to PDF and download
  const downloadPDF = () => {
    const pdf = new jsPDF();
    const content = document.getElementById('markdown-output')?.innerText || '';
    pdf.text(content, 10, 10);
    pdf.save('resume.pdf');
  };

  return (
    <div>
      <div id="markdown-output">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  );
};

export default ResumeViewer;
