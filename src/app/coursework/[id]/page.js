"use client";

export default function CourseEvaluationPage() {
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
    </>
  );
}
