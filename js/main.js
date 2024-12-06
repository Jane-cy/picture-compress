document.getElementById('upload').addEventListener('change', handleFileSelect);
document.getElementById('compressionRatio').addEventListener('input', updateCompressionValue);
document.getElementById('download').addEventListener('click', downloadCompressedImage);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('originalImage');
            img.src = e.target.result;
            img.onload = function() {
                document.getElementById('originalSize').textContent = `${(file.size / 1024).toFixed(2)} KB`;
                compressImage(img);
            };
        };
        reader.readAsDataURL(file);
    }
}

function updateCompressionValue(event) {
    const value = event.target.value;
    document.getElementById('compressionValue').textContent = `${value}%`;
    const img = document.getElementById('originalImage');
    if (img.src) {
        compressImage(img);
    }
}

function compressImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = document.getElementById('compressionRatio').value / 100;
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function(blob) {
        const compressedImg = document.getElementById('compressedImage');
        compressedImg.src = URL.createObjectURL(blob);
        document.getElementById('compressedSize').textContent = `${(blob.size / 1024).toFixed(2)} KB`;
    }, 'image/jpeg', ratio);
}

function downloadCompressedImage() {
    const compressedImg = document.getElementById('compressedImage');
    if (compressedImg.src) {
        const a = document.createElement('a');
        a.href = compressedImg.src;
        a.download = 'compressed-image.jpg';
        a.click();
    }
} 