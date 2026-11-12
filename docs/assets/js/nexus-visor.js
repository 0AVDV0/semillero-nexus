/* Nexus V10 · visor del afiche, sin nueva pestaña.
   Funciona con navegación normal o navegación instantánea de Material. */
(function () {
  function initNexusViewer() {
    const modal = document.querySelector("#nx-afiche-visor");
    if (!modal || typeof modal.showModal !== "function") return;
    const poster = document.querySelector(".nx-poster-trigger");
    if (!poster || poster.dataset.visorReady === "1") return;
    poster.dataset.visorReady = "1";

    const img = modal.querySelector(".nx-lightbox__image");
    const zoom = modal.querySelector(".nx-lightbox__zoom");
    const close = modal.querySelector(".nx-lightbox__close");
    const stage = modal.querySelector(".nx-lightbox__stage");
    const reset = () => {
      modal.classList.remove("is-zoomed");
      zoom.textContent = "Ampliar +";
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    };

    poster.addEventListener("click", function (event) {
      event.preventDefault();
      reset();
      img.src = poster.href;
      modal.showModal();
    });

    close.addEventListener("click", () => modal.close());
    zoom.addEventListener("click", () => {
      const isZoomed = modal.classList.toggle("is-zoomed");
      zoom.textContent = isZoomed ? "Ajustar a pantalla" : "Ampliar +";
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    });
    img.addEventListener("click", () => {
      if (modal.classList.contains("is-zoomed")) {
        modal.classList.remove("is-zoomed");
        zoom.textContent = "Ampliar +";
      }
    });
    // El navegador cierra <dialog> de forma nativa al pulsar Escape.
    modal.addEventListener("close", reset);
    modal.addEventListener("click", (event) => {
      const rect = modal.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right
       || event.clientY < rect.top || event.clientY > rect.bottom) {
        modal.close();
      }
    });
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initNexusViewer);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNexusViewer);
  } else {
    initNexusViewer();
  }
})();
