import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "../ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
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
import SvgEvaluationIcon from "../../../public/icons/SvgEvaluationIcon";
import SvgFileIcon from "../../../public/icons/SvgFileIcon";
import SvgCrossIcon from "../../../public/icons/SvgCrossIcon";
import { useToast } from "../ui/use-toast";

const CourseWorkForm = () => {
  const router = useRouter();
  const { addCoursework } = useCourseworkStore();

  const [pdfFile, setPdfFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [fileName, setFilename] = useState();
  const [courseType, setCourseType] = useState();
  const [subject, setSubject] = useState();
  const [subjectOptions, setSubjectOptions] = useState();
  const [essayTitle, setEssayTitle] = useState();
  const [isEvaluating, setIsEvaluating] = useState(false);

  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const preview = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfFile(reader.result);
      };
      reader.readAsDataURL(file);
      setPreviewUrl(preview);
      setFilename(file.name);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 15 * 1024 * 1024,
    noClick: true,
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        toast({
          variant: "destructive",
          title: fileRejections[0].errors[0].code,
          description: fileRejections[0].errors[0].message,
        });
      }
    },
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

    setTimeout(() => {
      const fileId = uuidv4();
      const evaluatedData = subject
        ? EvaluationData[subject]
        : EvaluationData[courseType];
      const data = {
        id: fileId,
        file: pdfFile,
        fileName: fileName,
        courseName: courseType,
        subject: subject,
        date: new Date(),
        ...evaluatedData,
      };
      addCoursework(data);
      toast({
        title: "Evaluation Complete",
        description: "Your file has been successfully evaluated.",
        variant: "success",
      });
      setIsEvaluating(false);
      router.push(`/coursework/${fileId}`);
    }, 1000);
  }, [addCoursework, subject, courseType, pdfFile, router]);

  const checkIsDisabled = () => {
    if (courseType !== "Tok Essay") {
      return !(previewUrl && courseType && essayTitle && subject);
    }
    return !(previewUrl && courseType && essayTitle);
  };

  return (
    <div className="grid h-auto w-full gap-4 rounded-[24px] bg-white p-3 lg:gap-[18px] lg:p-5 transition-all duration-500 ease-in-out transform hover:shadow-lg">
      <div
        {...getRootProps()}
        className={`flex h-[200px] w-full items-center justify-center overflow-hidden rounded-[12px] transition-all duration-500 ease-in-out ${
          isDragActive ? "scale-105" : ""
        }`}
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
                      <SvgCrossIcon />
                    </div>
                    <embed
                      src={previewUrl}
                      type="application/pdf"
                      width="100%"
                      height="200px"
                      className="rounded-[12px] p-4"
                    />{" "}
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
                  <SvgFileIcon />
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
                  onClick={open}
                  className="w-[173px] cursor-pointer rounded-[16px] border border-neutrals-200 px-3 py-2 text-center text-[15px] font-extrabold text-brand-primary shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-transform duration-500 ease-in-out transform hover:scale-105"
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
              <SelectTrigger className="flex h-10 items-center justify-between bg-background px-3 py-2 rounded-[20px] border border-[#d6dfe4] focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[15px] font-bold leading-[normal] text-[#5b6170] transition-all duration-500 ease-in-out hover:shadow-lg">
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
                <SelectTrigger className="flex h-10 items-center justify-between bg-background px-3 py-2 rounded-[20px] border border-[#d6dfe4] focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[15px] font-bold leading-[normal] text-[#5b6170] transition-all duration-500 ease-in-out hover:shadow-lg">
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
            {courseType === "Tok Essay" ? "Essay Title*" : "Topic / Title*"}
          </p>
          <input
            type="text"
            className="w-full rounded-3xl border border-[#d6dfe4] px-3 py-2 transition-transform duration-500 ease-in-out transform hover:shadow-lg"
            placeholder="Write your essay topic or title"
            value={essayTitle ?? ""}
            onChange={(e) => setEssayTitle(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`inline-flex  gap-2 items-center w-fit rounded-3xl hover:shadow-lg bg-brand-primary px-4 py-2 text-lg font-extrabold text-white transition-transform duration-500 ease-in-out transform  ${
          checkIsDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleCourseEvaluation}
        disabled={checkIsDisabled()}
      >
        <SvgEvaluationIcon />
        {isEvaluating ? (
          <>
            <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8 rounded-full"></div>
            <span>Evaluating...</span>
          </>
        ) : (
          <span class="leading-5">Evaluate your Score</span>
        )}
      </button>
    </div>
  );
};

export default CourseWorkForm;
