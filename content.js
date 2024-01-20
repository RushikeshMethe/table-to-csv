chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "downloadTable") {
      downloadTableAsCSV();
    }
  });
  
  function downloadTableAsCSV() {
    var table = document.querySelector("table");
  
    if (table) {
      var csvContent = "";
      var rows = table.querySelectorAll("tr");
  
      rows.forEach(function (row, index) {
        var rowData = [];
        var columns = row.querySelectorAll("td, th");
  
        columns.forEach(function (column) {
          rowData.push(column.innerText);
        });
  
        csvContent += rowData.join(",") + "\n";
      });
  
      var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "table.csv";
      link.click();
    } else {
      console.error("No table found on the page.");
    }
  }
  