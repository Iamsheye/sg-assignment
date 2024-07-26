"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, Menu } from "lucide-react";
import { BriefcaseIcon, MapPinIcon, CpuIcon, ClockIcon } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import jobsData from "@/jobs.json";
import { Vacancy } from "@/types/jobs";
import useOutsideClick from "@/hooks/useOutsideClick";
import Sidebar from "@/components/sidebar";
import { options } from "@/constants";

const VacancyListerPage = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState({
    search: "",
    sort: "default",
    educationLevel: options.educationLevel,
    experienceLevel: ["Junior (0-2 jr ervaring)", "Medior (3-5 jr ervaring)"],
    city: options.city,
    sector: options.sector,
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [jobs, setJobs] = useState<Vacancy[]>(jobsData);

  useEffect(() => {
    const filteredJobs = jobsData.filter((job) => {
      const searchMatch = job.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const educationMatch = filters.educationLevel.includes(
        job.specs.educationLevel
      );

      const experienceMatch = filters.experienceLevel.includes(
        job.specs.experienceLevel
      );

      const cityMatch = filters.city.includes(job.specs.city);

      const sectorMatch = filters.sector.includes(job.specs.sector);

      return (
        searchMatch &&
        educationMatch &&
        experienceMatch &&
        cityMatch &&
        sectorMatch
      );
    });

    setJobs(
      filteredJobs.sort((a, b) => {
        if (filters.sort === "asc") {
          return a.date.timestamp - b.date.timestamp;
        } else if (filters.sort === "desc") {
          return b.date.timestamp - a.date.timestamp;
        } else {
          return 0;
        }
      })
    );
  }, [filters]);

  useOutsideClick(sidebarRef, () => setShowSidebar(false));

  const sidebarClassName = showSidebar
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  return (
    <div className="grid md:grid-cols-[300px_1fr] w-full min-h-screen">
      <Sidebar
        filters={filters}
        className={sidebarClassName}
        setFilters={setFilters}
        sidebarRef={sidebarRef}
      />
      <div className="p-6 pl-6 gap-6">
        <div className="flex items-center justify-between mb-4">
          <Menu
            className="md:hidden"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          />
          <h1 className="text-3xl font-bold text-[#003366]">
            Job Listings <span className="text-lg">({jobs.length})</span>
          </h1>
          <div className="flex items-center gap-2"></div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Card key={job.jobId} className="border-[#d1e7fd]">
                <CardHeader>
                  <div className="flex justify-between gap-2 flex-wrap mb-2">
                    <h2 className="font-semibold text-xl text-[#003366]">
                      {job.title}
                    </h2>
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
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(job.date.timestamp).toLocaleTimeString()}
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
                </CardContent>
                <CardFooter>
                  <Link href={`/vacancy/${job.jobId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-500 text-white font-semibold border-none rounded-full px-5">
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
