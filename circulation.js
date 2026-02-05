const canvas = document.getElementById("circulationCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "/photos/doge_original.jpg";

let views = localStorage.getItem("viewCount") || 0;
views++;
localStorage.setItem("viewCount", views);

// decay image with each refresh of the page (each "view")
img.onload = () => {
    const scale = Math.max(0.1, 1 - views * 0.08);

    const w = img.width * scale;
    const h = img.height * scale;

    canvas.width = img.width;
    canvas.height = img.height;

    // downscale
    ctx.drawImage(img, 0, 0, w, h);

    // upscale back
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    // add noise
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += Math.random() * views * 2;
      imageData.data[i + 1] += Math.random() * views * 2;
      imageData.data[i + 2] += Math.random() * views * 2;
    }
    ctx.putImageData(imageData, 0, 0);
};

console.log(views);
