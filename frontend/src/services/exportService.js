import API from "../api/axios";

//COMMON DOWNLOAD FUNCTION

const downloadFile = async (
  url,
  filename
) => {

  try {

    const response =
      await API.get(url, {
        responseType: "blob",
      });

    const blob = new Blob([
      response.data,
    ]);

    const fileURL =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = fileURL;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      fileURL
    );

  } catch (err) {

    console.error(
      "Export failed:",
      err
    );

    alert(
      err.response?.data?.message ||
      "Export failed."
    );

  }

};

//EXPORT ALL NOTES

export const exportAllNotesPDF =
  async () => {

    await downloadFile(
      "/export/all/pdf",
      "All_Notes_Report.pdf"
    );

  };

export const exportAllNotesExcel =
  async () => {

    await downloadFile(
      "/export/all/excel",
      "All_Notes_Report.xlsx"
    );

  };

//EXPORT CLIENT NOTES

export const exportClientPDF =
  async (clientId) => {

    await downloadFile(
      `/export/client/${clientId}/pdf`,
      `Client_${clientId}_Notes.pdf`
    );

  };

export const exportClientExcel =
  async (clientId) => {

    await downloadFile(
      `/export/client/${clientId}/excel`,
      `Client_${clientId}_Notes.xlsx`
    );

  };