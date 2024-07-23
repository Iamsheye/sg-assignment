"use client";
import { useParams, useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  MapPinIcon,
  CpuIcon,
  ClockIcon,
  ArrowBackIcon,
} from "@/assets/svgs";
import { Vacancy } from "@/types/jobs";
import jobsData from "@/jobs.json";

const VacancyDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const job: Vacancy = jobsData.find((job) => job.jobId === params.id)!;

  return (
    <div className="md:w-5/6 mx-auto px-4 my-8">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => router.back()}
          className="shrink-0 flex items-center gap-2 font-semibold text-sm py-2 px-3 rounded-full hover:bg-slate-100">
          <ArrowBackIcon className="w-4 h-4" />
          Go Back
        </button>
        <h1 className="grow font-semibold text-4xl text-center">{job.title}</h1>
      </div>
      <div className="flex flex-wrap justify-around gap-4 p-2 mb-12">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {job.specs.city}, {job.specs.region}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {job.specs.hoursPerWeek}h
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {job.specs.educationLevel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CpuIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {job.specs.experienceLevel}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default VacancyDetailsLayout;
