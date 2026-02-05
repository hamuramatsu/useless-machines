const canvas = document.getElementById("dogeCanvas");
const ctx = canvas.getContext("2d");

const closeButton = document.getElementById("closeButton");
const nextButton = document.getElementById("nextButton");
const controls = document.getElementById("controls");
const filename = document.getElementById("filename");
// const filename2 = document.getElementById("filename2");
const screen = document.getElementById("screen");

canvas.width = 420;
canvas.height = 320;

// image list
const images = [
    "/photos/doge_original.jpg",
    "/photos/doge_copy.png",
    "/photos/doge_screenshot.jpg",
    "/photos/doge_compressed.jpg",
    "/photos/doge_scan_photocopy.jpg",
    "/photos/doge_againnn.png",
    "/photos/doge_meme_edit_v2.png",
    "/photos/doge_meme_edit_final_FINAL.png",
    "/photos/doge_compressed_v7.png",
    "/photos/doge_uploaded_recompressed.jpg",
    "/photos/doge_upscaled.jpg",
    "/photos/doge_upscaled_another_time.jpg",
    "/photos/dOgE_enhanced~~.webp",
    "/photos/doge_stock_001329.png",
    "/photos/doge_gettyimages_198700.png",
    "/photos/re-sampled_doGE.png"
];

let imgIndex = 0;
let decayLevel = 0;
let imageOpened = false;

const img = new Image();
img.src = images[imgIndex];

img.onload = drawImage;

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // base image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // add  decay
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += Math.random() * decayLevel * 20;
        imageData.data[i + 1] += Math.random() * decayLevel * 20;
        imageData.data[i + 2] += Math.random() * decayLevel * 20;
    }
    ctx.putImageData(imageData, 0, 0);

    filename.textContent = images[imgIndex].split("/").pop();
    // filename2.textContent = images[imgIndex].split("/").pop();
}

// clicking image to open larger
canvas.addEventListener("click", () => {
    if (!imageOpened) {
        imageOpened = true;
        screen.classList.add("open");
        controls.classList.remove("hidden");
        controls.classList.add("visible");
        filename.classList.remove("hidden");
        // filename2.classList.remove("hidden");
    }
});

// click 'x' button to exit and decay image
closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    imageOpened = false;
    screen.classList.remove("open");
    controls.classList.remove("visible");
    controls.classList.add("hidden");
    filename.classList.add("hidden");
    // filename2.classList.add("hidden");
    decayLevel++;
    drawImage();
});

// click forwardt to go through interaction images
nextButton.addEventListener("click", () => {
    if (imgIndex < images.length - 1) {
        imgIndex++;
        img.src = images[imgIndex];
    } else {
        enterMosaic();
    }
});



// final ending mode...
const mosaic = document.getElementById("mosaic");

function enterMosaic() {
    document.getElementById("screen").style.display = "none";
    filename.style.display = "none";

    mosaic.classList.remove("hidden");
    mosaic.classList.add("visible");

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    images.forEach((src, index) => {
        const tile = document.createElement("img");
        tile.src = src;

        // base size
        const baseWidth = viewportW * 0.25;
        const variation = Math.random() * 0.15 * viewportW;
        const width = baseWidth + variation;
        const height = width * 0.75;

        // position
        const x = Math.random() * (viewportW - width);
        const y = Math.random() * (viewportH - height);

        tile.style.width = `${width}px`;
        tile.style.height = `${height}px`;
        tile.style.left = `${x}px`;
        tile.style.top = `${y}px`;

        // blur hierarchy
        const blur = 0.5 + index * 0.25;
        tile.style.filter = `blur(${blur}px) contrast(1.1)`;

        // final image dominates space but pretty much illegible
        if (index === images.length - 1) {
            tile.style.width = `${viewportW * 0.7}px`;
            tile.style.height = `${viewportH * 0.7}px`;
            tile.style.left = `${viewportW * 0.15}px`;
            tile.style.top = `${viewportH * 0.15}px`;
            tile.style.filter = "blur(3px)";
        }

        mosaic.appendChild(tile);
    });
    
}


    