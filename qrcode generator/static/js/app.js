// Select form and preview elements
const form = document.getElementById("qr-form");
const dataInput = document.getElementById("data");
const qrPreview = document.getElementById("qr-preview");

// Event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const data = dataInput.value; // Get the input data

    if (!data) {
        alert("Please enter data to generate the QR code.");
        return;
    }

    try {
        // Send POST request to Flask backend
        const response = await fetch("/generate_qr", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }), // Send input as JSON
        });

        if (response.ok) {
            // Get the QR code image as a Blob
            const blob = await response.blob();
            const url = URL.createObjectURL(blob); // Create a URL for the Blob

            // Update the image source for preview
            qrPreview.src = url;
        } else {
            // Handle server errors
            const errorData = await response.json();
            alert(`Error: ${errorData.error || "Failed to generate QR code."}`);
        }
    } catch (error) {
        console.error("Error generating QR code:", error);
        alert("An error occurred. Please try again.");
    }
});
