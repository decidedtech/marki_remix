 
export default function DownloadButton({ clientId, name }: any) {
  // Function to handle the download of the PDF
  async function handleDownloadPdf() {
    try {
      // Step 1: Fetch the PDF from the API route
      const pdfResponse = await fetch(`/api/statement?clientId=${clientId}`);

      // Check if the response is OK
      if (!pdfResponse.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Step 2: Convert response to blob
      const pdfBlob = await pdfResponse.blob();

      // Step 3: Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Step 4: Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name} payment.pdf`;

      // Append the anchor to the document, click it, then remove it
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Step 5: Release the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  }

  return (
    <button
      onClick={handleDownloadPdf}
      className="btn btn-sm btn-primary text-white  rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
      Download Statement PDF
    </button>
  );
}
