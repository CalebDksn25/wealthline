// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the button and file input
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');

    // When the button is clicked, trigger the file input click
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle the file selection
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // You can handle the file upload here
            // For demonstration, we'll just alert the file name
            alert(`Selected file: ${file.name}`);

            // Example: Upload the file using Fetch API
            /*
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', { // Replace '/upload' with your server upload URL
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., display a success message)
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error (e.g., display an error message)
            });
            */
        }
    });
});
document.getElementById('optionsDropdown').addEventListener('change', function() {
    const selectedValue = this.value;
    alert(`You selected: ${selectedValue}`);
    // You can add more functionality here based on the selected option
});

