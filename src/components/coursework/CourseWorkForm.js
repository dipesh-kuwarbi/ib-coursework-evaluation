import { useFileStore } from "@/store/useFileStore";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "../ui/scroll-area";
import { uuid } from "uuidv4";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EvaluationData, courseTypeOptions } from "@/lib/globalConstants";
import { useCourseworkStore } from "@/store/useCourseWork";
import { useRouter } from "next/navigation";

const CourseWorkForm = () => {
  const router = useRouter();
  const { addCoursework, getCourseWorkList, courseworkList } =
    useCourseworkStore();

  const [pdfFile, setPdfFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [fileName, setFilename] = useState();
  const [courseType, setCourseType] = useState();
  const [subject, setSubject] = useState();
  const [subjectOptions, setSubjectOptions] = useState();
  const [essayTitle, setEssayTitle] = useState();

  const [isEvaluating, setIsEvaluating] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const preview = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfFile(reader.result);
      };
      reader.readAsDataURL(file);
      setPreviewUrl(preview);
      setFilename(file.path);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxSize: 15 * 1024 * 1024, // 15MB limit
    noClick: true, // Disable automatic click behavior
  });

  const handleSelectValueChange = (value) => {
    setCourseType(value);
    setSubject();

    switch (value) {
      case "Extended Essay":
        setSubjectOptions([
          "Business Management",
          "Economics",
          "Language And Literature",
        ]);
        break;
      case "Internal Assessment":
        setSubjectOptions(["Mathematics"]);
        break;
      default:
        setSubjectOptions();
    }
  };

  const handleCourseEvaluation = useCallback(() => {
    setIsEvaluating(true);
    let data;
    const fileId = uuid();
    let evoluatedData = subject
      ? EvaluationData[subject]
      : EvaluationData[courseType];
    data = {
      id: fileId,
      file: pdfFile,
      courseName: courseType,
      subject: subject,
      date: new Date(),
      ...evoluatedData,
    };
    addCoursework(data);
    setIsEvaluating(false);
    console.log(pdfFile);
    router.push(`/coursework/${fileId}`);
  }, [addCoursework, subject, courseType, pdfFile, EvaluationData, previewUrl]);

  const checkIsDisabled = () => {
    if (courseType !== "Tok Essay") {
      return !(previewUrl && courseType && essayTitle && subject);
    }
    return !(previewUrl && courseType && essayTitle);
  };

  return (
    <div className="grid h-auto w-full gap-4 rounded-[24px] bg-white p-3 lg:gap-[18px] lg:p-5">
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
              <>
                <ScrollArea>
                  <div className="relative overflow-hidden size-[140px] rounded-[6px] border border-neutrals-200">
                    <div
                      class="absolute right-[-2px] top-[-2px] z-99 cursor-pointer rounded-full border bg-white p-[2px]"
                      onClick={() => setPreviewUrl("")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x size-3"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </div>
                    <embed
                      src={previewUrl}
                      type="application/pdf"
                      width="100%"
                      height="200px"
                      className="rounded-[12px] p-4"
                    />
                  </div>
                </ScrollArea>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-[#98a1bb] ">
                    {fileName}
                  </p>
                </div>
              </>
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
      <div className="flex flex-col items-center gap-4 self-stretch">
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className="text-sm font-semibold leading-[normal] text-[#7a8196]">
            Select your coursework type
            {courseType === "Tok Essay" ? "*" : " and subject*"}
          </p>
          <div className="flex gap-[12px]">
            <Select onValueChange={handleSelectValueChange} value={courseType}>
              <SelectTrigger className="flex h-10 items-center justify-between bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-[20px] border border-[#d6dfe4] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit text-[15px] font-bold leading-[normal] text-[#5b6170]">
                <SelectValue placeholder="Coursework Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {courseTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {subjectOptions && (
              <Select
                onValueChange={(value) => setSubject(value)}
                value={subject ?? ""}
              >
                <SelectTrigger className="flex h-10 items-center justify-between bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-[20px] border border-[#d6dfe4] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit text-[15px] font-bold leading-[normal] text-[#5b6170]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {subjectOptions?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className="text-sm font-semibold leading-[normal] text-[#7a8196]">
            Enter your essay title*
          </p>
          <div className="flex h-[40px] w-full items-end rounded-[28px] border border-neutrals-200 bg-white p-1 text-base font-medium leading-[normal] sm:w-[330px]">
            <input
              type="text"
              className="flex w-full rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 h-full border-none p-0 px-2 font-semibold text-[#1e2026]placeholder:text-[#98a1bb] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="how nation works....."
              value={essayTitle}
              onChange={(event) => setEssayTitle(event.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-[14px] h-[40px] w-full justify-center gap-2 rounded-3xl bg-brand-primary p-2 pr-6 text-[18px] font-bold leading-[normal] text-white hover:bg-brand-primary disabled:bg-[#adb8c9] sm:w-fit"
        disabled={checkIsDisabled()}
        onClick={handleCourseEvaluation}
      >
        <svg
          class="size-6 rounded-xl"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect width="24" height="24" fill="white" fill-opacity="0.8"></rect>
          <g clip-path="url(#clip0_1_1311)">
            <path
              d="M10.9525 7.46965L10.8015 7.41047L10.6502 7.46896L9.44001 7.93686L9.91754 6.74249L9.97701 6.59375L9.92152 6.44348L9.51857 5.35217L10.5975 5.76042L10.7488 5.81769L10.8992 5.75778L12.0959 5.2809L11.6287 6.49349L11.5698 6.64631L11.6308 6.79834L12.0765 7.91014L10.9525 7.46965ZM17.9466 14.4676L17.7965 14.4116L17.6476 14.4705L16.4573 14.9411L16.9311 13.756L16.9926 13.6021L16.9316 13.448L16.4843 12.318L17.6022 12.7705L17.7573 12.8333L17.9127 12.7713L19.1002 12.2981L18.6302 13.4909L18.5709 13.6414L18.6287 13.7925L19.0438 14.8774L17.9466 14.4676ZM9.90976 16.6878L9.76487 16.6357L9.62093 16.6903L6.52116 17.8674L7.69824 14.7677L7.75274 14.6241L7.7011 14.4796L6.59487 11.3826L9.70181 12.4807L9.84524 12.5313L9.98759 12.4777L13.074 11.3146L11.9109 14.401L11.8571 14.5438L11.9082 14.6875L13.0164 17.8041L9.90976 16.6878Z"
              fill="#6947BF"
              stroke="#6947BF"
              stroke-width="0.833333"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_1_1311">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(2 2.00012)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
        <span class="leading-5">Evaluate your Score</span>
      </button>
    </div>
  );
};

export default CourseWorkForm;
