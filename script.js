// script.js
document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const uploadedFileDisplay = document.getElementById('uploaded-file');
    const nextPageButton = document.getElementById('next-page-button');

    // Handle new page button click
    nextPageButton.addEventListener('click', function () {
        // Open a new page when the button is clicked
        window.location.href = 'results.html';
    });
    // Trigger file input click when button is clicked
    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });
    // comment out this code when you want to implent the file upload to the server
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            // Create a temporary URL for the file using URL.createObjectURL
            const temporaryUrl = URL.createObjectURL(file);

            // Display the uploaded file link or details
            uploadedFileDisplay.innerHTML = `
                <p>Uploaded File: <a href="${temporaryUrl}" target="_blank">${file.name}</a></p>
            `;

            // Clean up the temporary URL when no longer needed (optional)
            fileInput.addEventListener('change', function () {
                URL.revokeObjectURL(temporaryUrl);
            });
        } else {
            uploadedFileDisplay.innerHTML = '<p style="color: red;">No file selected. Please try again.</p>';
        }
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
    alert(`You selected: ${selectedValue}`);
    // You can add more functionality here based on the selected option
});

});