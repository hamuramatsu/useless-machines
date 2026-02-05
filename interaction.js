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
    "/photos/doge_enhanced~~.webp"
];

let index = 0;

const dogeImg = document.getElementById("interactionImg");
const filename = document.getElementById("filename");

dogeImg.src = images[index];
filename.textContent = images[index].split("/").pop();

dogeImg.addEventListener("click", () => {
    if (index < images.length - 1) {
        index++;
        dogeImg.src = images[index];
        filename.textContent = images[index].split("/").pop();
    }
});
