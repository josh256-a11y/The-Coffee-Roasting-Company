
document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("img").forEach(img => {
        if (!img.classList.contains("nolightbox")) {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", () => {
                const overlay = document.createElement("div");
                overlay.className = "lb-overlay";
                const big = document.createElement("img");
                big.src = img.src;
                const closeBtn = document.createElement("div");
                closeBtn.textContent = "×";
                closeBtn.className = "lb-close";
                overlay.appendChild(big);
                overlay.appendChild(closeBtn);
                document.body.appendChild(overlay);
                closeBtn.onclick = () => overlay.remove();
                overlay.onclick = (e) => { if(e.target===overlay) overlay.remove(); };
            });
        }
    });
});
