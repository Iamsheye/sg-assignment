"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  BriefcaseIcon,
  MapPinIcon,
  CpuIcon,
  ClockIcon,
} from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import jobsData from "@/jobs.json";
import { Vacancy } from "@/types/jobs";

const VacancyListerPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [jobs, setJobs] = useState<Vacancy[]>(jobsData);

  useEffect(() => {
    setJobs(
      jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6 w-full min-h-screen">
      <div className="bg-background border-r p-6 flex flex-col gap-6 sticky top-0 h-[100dvh]">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search jobs..."
            className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm"
          />
        </div>
      </div>
      <div className="p-6 pl-0 gap-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <div className="flex items-center gap-2"></div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Card key={job.jobId}>
                <CardHeader>
                  <div className="flex justify-between gap-4">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <div className="shrink-0 flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {job.specs.city}, {job.specs.region}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: job.intro.substring(0, 135) + "...",
                    }}></p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
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
                </CardContent>
                <CardFooter>
                  <Link href={`/vacancy/${job.jobId}`}>
                    <Button variant="outline" size="sm">
                      See Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyListerPage;
