"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
import useOutsideClick from "@/hooks/useOutsideClick";

const VacancyListerPage = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [jobs, setJobs] = useState<Vacancy[]>(jobsData);

  useEffect(() => {
    setJobs(
      jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  useOutsideClick(sidebarRef, () => setShowSidebar(false));

  const sidebarClassName = showSidebar
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  return (
    <div className="grid md:grid-cols-[300px_1fr] w-full min-h-screen">
      <div
        ref={sidebarRef}
        className={`bg-background border-r p-6 flex flex-col gap-6 h-[100dvh] md:sticky md:top-0 absolute transition-transform duration-300 ${sidebarClassName}`}>
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
      <div className="p-6 pl-6 gap-6">
        <div className="flex items-center justify-between mb-4">
          <Menu
            className="md:hidden"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          />
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <div className="flex items-center gap-2"></div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Card key={job.jobId}>
                <CardHeader>
                  <div className="flex justify-between gap-2 flex-wrap mb-2">
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
