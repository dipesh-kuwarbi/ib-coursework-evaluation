"use client";

import CourseWorkForm from "@/components/coursework/CourseWorkForm";

export default function CourseworkPage() {
  return (
    <div className="relative flex-1 rounded-t-3xl md:rounded-tr-none">
      <main className="flex min-h-[calc(100lvh-60px)] flex-1 flex-col items-start justify-center gap-10 bg-gray-background px-2 py-[80px] font-mont sm:min-h-lvh sm:px-0 md:py-[100px]">
        <section className="mx-20 flex w-fit flex-col gap-4 sm:flex-row">
          <div className="flex w-full max-w-screen-sm-2 flex-col justify-end gap-6">
            <p className="text-[24px] font-extrabold leading-[normal] text-[#1e2026] lg:text-[32px]">
              Hey IB Folks ! Unsure about the quality of your answers?
              <span className="text-brand-primary"> We get you.</span>
            </p>
            <CourseWorkForm />
          </div>
          <div class="hidden justify-center md:min-w-[250px] lg:flex lg:min-w-[290px]">
            <img
              alt="eveluation image"
              fetchpriority="high"
              width="390"
              height={528}
              decoding="async"
              data-nimg="1"
              className="h-auto sm:w-[290px]"
              src="https://www.zuai.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcoursework.e5be75b5.webp&w=828&q=75"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
