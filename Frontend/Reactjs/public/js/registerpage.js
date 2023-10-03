
function setPageAttributes() {
     document.body.id = "bodyRegs";
    document.body.className = "bg-gradient-info";
}


function setDefaultPageAttributes() {
    document.body.id = "page-top";
   document.body.className = "bg-gradient-normal";
}


function convertDateDDMMYYToISOString(dateString) {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split("-").map(Number);
  
    // Create a JavaScript Date object with the parsed components
    const dateObject = new Date(2000 + year, month - 1, day); // Subtract 1 from month since JavaScript months are zero-based
  
    // Convert the Date object to an ISO string
    const isoString = dateObject.toISOString();
  
    return isoString;
}

function formatDateDDMMYYYY(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
        const year = date.getFullYear();
      
        return `${day}-${month}-${year}`;
      }
