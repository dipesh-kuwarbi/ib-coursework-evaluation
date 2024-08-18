import React, { useMemo } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FiZoomIn, FiZoomOut, FiMaximize } from "react-icons/fi";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

const PdfViewer = ({ pdfFile }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreenButton } = fullScreenPluginInstance;

  const pdfBlob = useMemo(() => {
    const byteCharacters = atob(pdfFile.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  }, [pdfFile]);

  const blobUrl = URL.createObjectURL(pdfBlob);
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="w-full flex justify-between items-center ">
        {/* PDF Name */}
        <h2 className="text-lg font-bold">{pdfFile?.name}</h2>
        {/* Controls */}
        <div className="flex gap-2 items-center">
          <ZoomOutButton>
            {(props) => (
              <button
                onClick={props.onClick}
                disabled={props.isDisabled}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                <FiZoomOut size={20} />
              </button>
            )}
          </ZoomOutButton>
          <ZoomInButton>
            {(props) => (
              <button
                onClick={props.onClick}
                disabled={props.isDisabled}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                <FiZoomIn size={20} />
              </button>
            )}
          </ZoomInButton>
          <EnterFullScreenButton>
            {(props) => (
              <button
                onClick={props.onClick}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                <FiMaximize size={20} />
              </button>
            )}
          </EnterFullScreenButton>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-full border rounded-lg shadow-lg">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={blobUrl}
            plugins={[zoomPluginInstance, fullScreenPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
