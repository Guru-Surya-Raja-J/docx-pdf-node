document.addEventListener('DOMContentLoaded', () => {
    // --- UI Element References ---
    const fileInput = document.getElementById('fileInput');
    const customFileUploadLabel = document.querySelector('.custom-file-upload');
    const convertDocxToPdfBtn = document.getElementById('convertDocxToPdf');
    // Note: convertPdfToDocxBtn is kept in HTML but disabled as backend doesn't support
    const convertPdfToDocxBtn = document.getElementById('convertPdfToDocx'); 
    const statusMsg = document.getElementById('statusMsg'); 
    const downloadLink = document.getElementById('downloadLink');

    // --- UI State Management Functions ---
    function resetUI() {
        if (fileInput) {
            fileInput.value = ''; // Clear selected file
            fileInput.disabled = false; // Ensure file input is enabled
        }
        if (customFileUploadLabel) customFileUploadLabel.style.pointerEvents = 'auto'; // Ensure label is clickable

        if (convertDocxToPdfBtn) convertDocxToPdfBtn.disabled = true;
        if (convertPdfToDocxBtn) convertPdfToDocxBtn.disabled = true; // Still disabled as backend doesn't support
        
        if (statusMsg) statusMsg.textContent = 'Choose your document and hit convert with ease.'; // Reset status message
        if (downloadLink) {
            downloadLink.style.display = 'none'; // Hide download link
            downloadLink.href = '#'; // Reset download link URL
            downloadLink.textContent = 'Download Converted File'; // Reset download link text
        }
    }

    function updateUI(file = null) {
        if (convertDocxToPdfBtn) convertDocxToPdfBtn.disabled = true;
        if (convertPdfToDocxBtn) convertPdfToDocxBtn.disabled = true;
        if (downloadLink) downloadLink.style.display = 'none';

        if (file) {
            if (statusMsg) statusMsg.textContent = `Selected: ${file.name}`;
            if (file.name.toLowerCase().endsWith('.docx')) {
                if (convertDocxToPdfBtn) convertDocxToPdfBtn.disabled = false; // Enable DOCX to PDF
            } else {
                if (statusMsg) statusMsg.textContent = 'Please select a .docx file for conversion.';
                // Keep convert button disabled if wrong file type
            }
        } else {
            resetUI(); // If no file selected, reset to initial state
        }
    }

    // --- Event Listeners ---
    // Initial UI setup on page load
    resetUI(); 

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            updateUI(fileInput.files[0]);
        });
    } else {
        console.error("Error: fileInput element not found. Check index.html ID.");
    }

    // --- Conversion Logic (similar to previous versions) ---
    async function handleConvert(type) {
        const file = fileInput.files[0];

        if (!file) {
            if (statusMsg) statusMsg.textContent = "Please select a file first.";
            return;
        }

        if (type === 'pdfToDocx' || !file.name.toLowerCase().endsWith('.docx')) {
            if (statusMsg) statusMsg.textContent = "Only DOCX to PDF conversion is supported.";
            return;
        }

        if (statusMsg) statusMsg.textContent = "Uploading and converting... This may take a moment.";
        // Disable all interactive elements during conversion
        if (convertDocxToPdfBtn) convertDocxToPdfBtn.disabled = true;
        if (convertPdfToDocxBtn) convertPdfToDocxBtn.disabled = true;
        if (downloadLink) downloadLink.style.display = 'none';
        if (fileInput) fileInput.disabled = true;
        if (customFileUploadLabel) customFileUploadLabel.style.pointerEvents = 'none';

        const formData = new FormData();
        formData.append("file", file);

        try {
           const backendUrl = "https://nodejs-converter-backend.onrender.com/convert";

            const response = await fetch(backendUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob(); 
                const url = window.URL.createObjectURL(blob); 
                
                const originalFileName = file.name.split('.').slice(0, -1).join('.');
                const downloadFileName = `${originalFileName}.pdf`; 

                if (downloadLink) {
                    downloadLink.href = url;
                    downloadLink.download = downloadFileName;
                    downloadLink.textContent = `Download ${downloadFileName}`;
                    downloadLink.style.display = 'inline-block';
                    
                    const tempAnchor = document.createElement('a');
                    tempAnchor.href = url;
                    tempAnchor.download = downloadFileName;
                    document.body.appendChild(tempAnchor);
                    tempAnchor.click();
                    document.body.removeChild(tempAnchor);
                }
                if (statusMsg) statusMsg.textContent = "Conversion successful! Your file is downloading.";

                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    resetUI();
                }, 3000);

            } else {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    if (statusMsg) statusMsg.textContent = `Conversion failed! ${errorData.error || 'Unknown error.'}`;
                    console.error("Server error (JSON):", errorData);
                } catch (e) {
                    if (statusMsg) statusMsg.textContent = `Conversion failed! ${errorText || 'Unknown error.'}`;
                    console.error("Server error (raw text):", errorText);
                }
                // Re-enable file input and custom label on error
                if (fileInput) fileInput.disabled = false;
                if (customFileUploadLabel) customFileUploadLabel.style.pointerEvents = 'auto';
                updateUI(fileInput.files[0]);
            }
        } catch (err) {
            if (statusMsg) statusMsg.textContent = "Conversion failed due to a network error or server issue!";
            console.error("Fetch error:", err);
            // Re-enable file input and custom label on error
            if (fileInput) fileInput.disabled = false;
            if (customFileUploadLabel) customFileUploadLabel.style.pointerEvents = 'auto';
            updateUI(fileInput.files[0]);
        }
    }

    // Attach click event listeners to the conversion buttons
    if (convertDocxToPdfBtn) {
        convertDocxToPdfBtn.addEventListener('click', () => handleConvert('docxToPdf'));
    }

    if (convertPdfToDocxBtn) {
        convertPdfToDocxBtn.addEventListener('click', () => handleConvert('pdfToDocx'));
    }
});
