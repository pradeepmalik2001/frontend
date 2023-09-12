// Function to post data to the API
function postDataToApi(data) {
  const apiUrl = "http://localhost:8080/report/save"; // Replace with your API endpoint

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Modify the content type as needed
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Data posted successfully:", responseData);
      // You can handle the response data here if needed
    })
    .catch((error) => {
      console.error("Error posting data to API:", error);
    });
}

// JavaScript code to handle form submission
document
  .getElementById("timeTrackerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const projectName = document.getElementById("projectName").value;
    const date = document.getElementById("date").value;
    const hoursWorked = parseFloat(
      document.getElementById("hoursWorked").value
    );
    const comments = document.getElementById("comments").value;

    // Clear form fields
    document.getElementById("projectName").value = "";
    document.getElementById("date").value = "";
    document.getElementById("hoursWorked").value = "";
    document.getElementById("comments").value = "";

    // Create a data object to send to the API
    const postData = {
      name: projectName,
      date: date,
      value: hoursWorked, // Assuming this is the format your API expects
      comments: comments,
    };

    // Post the user's data to the API
    postDataToApi(postData);

    // Create a new list item to display the user's entry
    const entryItem = document.createElement("li");
    entryItem.innerHTML = `
    <strong>Project Name:</strong> ${projectName}<br>
    <strong>Date:</strong> ${date}<br>
    <strong>Hours Worked:</strong> ${hoursWorked}<br>
    <strong>Comments:</strong> ${comments}<br><br>
  `;

    // Append the user's entry to the list
    document.getElementById("entryList").appendChild(entryItem);
  });
