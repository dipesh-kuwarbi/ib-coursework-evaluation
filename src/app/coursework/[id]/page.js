"use client";

import PdfViewer from "@/components/PdfViewer";
import { useCourseworkStore } from "@/store/useCourseWork";
import { useParams, useRouter } from "next/navigation";

export default function CourseEvaluationPage() {
  const { id } = useParams();

  const { courseworkList } = useCourseworkStore();

  const courseWork = courseworkList.find((course) => course.id === id);

  return (
    <>
      <div className="w-full items-center justify-between gap-7 rounded-3xl bg-white p-3 pl-6 flex sm:hidden">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-sm font-bold leading-[normal] text-[#3d404b]">
            Overall Score
          </p>
          <p className="text-2xl font-extrabold leading-[normal] text-[#3d404b]">
            Remark :<span style={{ color: "rgb(60, 194, 138)" }}></span>
          </p>
          <p className="text-xs font-semibold leading-[normal] text-[#98a1bb]"></p>
        </div>
      </div>
      <div className="sticky top-[66px] hidden lg:flex flex-1 h-lvh max-w-[972px] lg:min-w-[50%]">
        <div className="w-full max-w-[972px]  flex-1 overflow-hidden rounded-3xl rounded-b-none sm:min-w-[280px] lg:min-w-[50%]">
          <PdfViewer pdfFile={courseWork?.file} />
        </div>
      </div>
    </>
  );
}
