document.addEventListener('DOMContentLoaded', function() {
    const needle = document.getElementById('arrow');
    const counter = document.getElementById('counter');
    const input = document.getElementById('testParam');

    input.addEventListener('input', function() {
        const value = input.value;
        const rotation = (value * 1.8); // Map 0-100 to -90 to 90 degrees
        needle.style.transform = `rotate(${rotation}deg)`;
        counter.textContent = value;
    });

    document.addEventListener("DOMContentLoaded", () => {
        const dataDisplay = document.getElementById("data-display");
    
        // Function to fetch data from AWS server
        async function fetchDataFromAWS() {
            try {
                const response = await fetch("https://your-aws-endpoint-url.com/data", 
                     { // Replace with your AWS endpoint URL
                    method: "GET", // or "POST" depending on your server setup
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                const data = await response.json(); // Parse the JSON response
    
                // Display the received data
                dataDisplay.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                console.error("Error fetching data:", error);
                dataDisplay.innerHTML = `<p style="color: red;">Failed to load data. Please try again later.</p>`;
            }
        }
    
        // Call the fetch function when the page loads
        fetchDataFromAWS();
    
        // Optionally, refresh data periodically
        setInterval(fetchDataFromAWS, 30000); // Refresh every 30 seconds
    });
    
});
