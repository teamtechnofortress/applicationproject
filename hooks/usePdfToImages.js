import { useState, useEffect } from "react";

const usePdfToImages = () => {
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);

  useEffect(() => {
    const loadPdfJs = async () => {
      if (!window.pdfjsLib) {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.type = "module";
          script.src = `${process.env.NEXT_PUBLIC_HOST}/pdfjs/pdf.mjs`;
          script.onload = () => {
            setPdfjsLoaded(true);
            resolve();
          };
          script.onerror = () => reject(new Error("Failed to load PDF.js"));
          document.body.appendChild(script);
        });
      } else {
        setPdfjsLoaded(true);
      }
    };

    loadPdfJs();
  }, []);

  const convertPdfToImages = async (pdfUrl) => {
    if (!pdfjsLoaded) {
      console.error("PDF.js is not loaded yet.");
      return [];
    }

    const pdfjsLib = window.pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.NEXT_PUBLIC_HOST}/pdfjs/pdf.worker.mjs`;

    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const images = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        images.push(canvas.toDataURL("image/png"));
      }

      return images;
    } catch (error) {
      console.error("Error converting PDF to images:", error);
      return [];
    }
  };

  return { convertPdfToImages };
};

export default usePdfToImages;
