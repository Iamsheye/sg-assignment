type VacancySpec = {
  __typename: string;
  educationLevel: string;
  employmentTerm: string;
  experienceLevel: string;
  hoursPerWeek: number;
  languages: string;
  region: string;
  city: string;
  industry: string;
  function: string;
  functionGroup: string;
  sector: string;
  companyType: string;
};

type VacancyDate = {
  __typename: string;
  timestamp: number;
};

export type Vacancy = {
  specs: VacancySpec;
  jobId: string;
  intro: string;
  date: VacancyDate;
  industry: string;
  title: string;
  recruiter: string;
};
