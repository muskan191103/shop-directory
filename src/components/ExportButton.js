import * as XLSX from "xlsx";

function ExportButton({ data }) {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No contacts to export");
      return;
    }

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(c => ({
        Location: c.location,
        Name: c.name,
        Phone: c.phone
      }))
    );

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    // Download file
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <button onClick={exportToExcel}>
        📤 Export to Excel
      </button>
    </div>
  );
}

export default ExportButton;
