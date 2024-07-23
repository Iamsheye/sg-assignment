"use client";
import { useParams } from "next/navigation";
import { Vacancy } from "@/types/jobs";
import jobsData from "@/jobs.json";
import { Button } from "@/components/ui/button";
import { ArrowBackIcon } from "@/assets/svgs";
import Link from "next/link";

const VacancyDetailsPage = () => {
  const params = useParams<{ id: string }>();

  const job: Vacancy = jobsData.find((job) => job.jobId === params.id)!;

  return (
    <div>
      <h2 className="text-black text-lg font-semibold">Job Description</h2>
      <p
        className="text-muted-foreground my-4"
        dangerouslySetInnerHTML={{ __html: job.intro }}></p>
      <div className="mb-12">
        <p className="text-muted-foreground text-sm">
          Recruiter:{" "}
          <span className="text-base font-semibold text-black">
            {job.recruiter}
          </span>
        </p>
      </div>
      <Link href={`/vacancy/${job.jobId}/apply`}>
        <Button className="bg-blue-500 text-base font-bold">
          Apply
          <ArrowBackIcon className="rotate-180 w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default VacancyDetailsPage;
