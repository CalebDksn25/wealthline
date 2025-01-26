document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("upload-button");
    const fileInput = document.getElementById("file-input");
    const uploadedFileDisplay = document.getElementById("uploaded-file");
    const nextPageButton = document.getElementById("next-page-button");
    const dropdown = document.getElementById("optionsDropdown");

    let fileUploaded = false;
    let dropdownSelected = false;

    // Function to enable or disable the "Get Analysis" button
    function updateButtonState() {
        nextPageButton.disabled = !(fileUploaded && dropdownSelected);
    }

    // Handle "Next Page" button click
    nextPageButton.addEventListener("click", function () {
        if (!nextPageButton.disabled) {
            // Open a new page when the button is clicked
            window.location.href = "results.html";
        }
    });

    // Trigger file input click when upload button is clicked
    uploadButton.addEventListener("click", function () {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            fileUploaded = true; // Mark file as uploaded
            // Create a temporary URL for the file
            const temporaryUrl = URL.createObjectURL(file);

            // Display the uploaded file link with a delete button
            uploadedFileDisplay.innerHTML = `
                <span class="uploaded-file">
                    <a href="${temporaryUrl}" target="_blank">${file.name}</a>
                    <button id="delete-file" class="delete-button">X</button>
                </span>
            `;

            // Handle file deletion
            const deleteFileButton = document.getElementById("delete-file");
            deleteFileButton.addEventListener("click", function () {
                uploadedFileDisplay.innerHTML = ""; // Clear the display
                fileInput.value = ""; // Clear the input value
                fileUploaded = false; // Reset fileUploaded flag
                updateButtonState(); // Re-check conditions
            });

            // Clean up the temporary URL when no longer needed
            fileInput.addEventListener("change", function () {
                URL.revokeObjectURL(temporaryUrl);
            });
        } else {
            fileUploaded = false;
            uploadedFileDisplay.innerHTML = '<p style="color: red;">No file selected. Please try again.</p>';
        }
        updateButtonState(); // Re-check conditions
    });

    // Handle dropdown selection
    dropdown.addEventListener("change", function () {
        dropdownSelected = dropdown.value !== ""; // Check if a valid option is selected
        updateButtonState(); // Re-check conditions
    });

    // Initial state of the "Get Analysis" button
    updateButtonState();
});



    
    // use the commented code below to upload the file to the server and initiate the server to save the file
    // Handle file input change
    // fileInput.addEventListener('change', async function (event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);

            // try {
            //     // Send the file to the server
            //     const response = await fetch('/upload', { // Replace '/upload' with your server endpoint
            //         method: 'POST',
            //         body: formData,
            //     });

            //     if (response.ok) {
            //         const result = await response.json();

            //         // Display the uploaded file link or details
            //         uploadedFileDisplay.innerHTML = `
            //             <p>Uploaded File: <a href="${result.fileUrl}" target="_blank">${file.name}</a></p>
            //         `;
            //     } else {
            //         uploadedFileDisplay.innerHTML = '<p style="color: red;">Upload failed. Please try again.</p>';
            //     }
            // } catch (error) {
            //     console.error('Error uploading file:', error);
            //     uploadedFileDisplay.innerHTML = '<p style="color: red;">An error occurred. Please try again later.</p>';
            // }
        // }
    // });


document.getElementById('optionsDropdown').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log(selectedValue);
});

