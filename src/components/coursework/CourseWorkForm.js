import { useFileStore } from "@/store/useFileStore";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const CourseWorkForm = () => {
  const { addFile } = useFileStore();
  const [previewUrl, setPreviewUrl] = useState();

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const fileId = uuidv4(); // Generate a unique ID
        const preview = URL.createObjectURL(file);

        // Add file to Zustand store
        addFile({ id: fileId, file, preview });

        // Set the preview URL for immediate feedback
        setPreviewUrl(preview);
      });
    },
    [addFile]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxSize: 15 * 1024 * 1024, // 15MB limit
    noClick: true, // Disable automatic click behavior
  });

  return (
    <div className="grid h-auto w-full gap-3 rounded-[24px] bg-white p-3 lg:gap-[18px] lg:p-5">
      <div
        {...getRootProps()}
        className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-[12px]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%236947BFFF' stroke-width='3' stroke-dasharray='4%2c14' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e\")",
        }}
      >
        <div role="presentation" tabIndex={0}>
          <input {...getInputProps()} style={{ display: "none" }} />
          <div
            className={`flex w-full flex-col items-center justify-center gap-[20px] ${
              isDragActive ? "bg-gray-200" : "transparent"
            }`}
          >
            {previewUrl ? (
              // PDF Preview
              <div className="flex flex-col items-center justify-center gap-[9px]">
                <embed
                  src={previewUrl}
                  type="application/pdf"
                  width="100%"
                  height="200px"
                  className="rounded-[12px] border"
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="38"
                    viewBox="0 0 30 38"
                    fill="none"
                    className="size-12"
                  >
                    <path
                      d="M13.946 31.6885H16.2155V21.5805L20.5655 25.95L22.1655 24.35L15 17.327L7.9155 24.4305L9.496 26.0115L13.946 21.5805V31.6885ZM2.8845 38C2.10017 38 1.42333 37.7153 0.854 37.146C0.284667 36.5767 0 35.8998 0 35.1155V2.8845C0 2.10017 0.284667 1.42333 0.854 0.854001C1.42333 0.284668 2.10017 0 2.8845 0H20.2615L30 9.7385V35.1155C30 35.8998 29.7153 36.5767 29.146 37.146C28.5767 37.7153 27.8998 38 27.1155 38H2.8845ZM19.127 10.7615V2.2695H2.8845C2.73083 2.2695 2.58983 2.3335 2.4615 2.4615C2.3335 2.58983 2.2695 2.73083 2.2695 2.8845V35.1155C2.2695 35.2692 2.3335 35.4102 2.4615 35.5385C2.58983 35.6665 2.73083 35.7305 2.8845 35.7305H27.1155C27.2692 35.7305 27.4102 35.6665 27.5385 35.5385C27.6665 35.4102 27.7305 35.2692 27.7305 35.1155V10.7615H19.127Z"
                      fill="#98A1BB"
                    />
                  </svg>

                  <div className="text-center">
                    <p className="text-base font-bold text-[#7a8196]">
                      Drag and drop a PDF
                    </p>
                    <p className="text-xs font-semibold text-[#7a8196]">
                      *Limit 15 MB per file.
                    </p>
                  </div>
                </div>
                <div
                  onClick={open} // Opens the file dialog manually
                  className="w-[173px] cursor-pointer rounded-[16px] border border-neutrals-200 px-3 py-2 text-center text-[15px] font-extrabold text-brand-primary shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]"
                >
                  Upload your file
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWorkForm;
