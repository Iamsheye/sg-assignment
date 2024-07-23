"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/form-field";
import { useState } from "react";

const ApplicationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  coverLetter: z.string().optional(),
});

type ApplicationForm = z.infer<typeof ApplicationSchema>;

const VacancyApplyPage = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(ApplicationSchema),
  });

  const onSubmit = (data: ApplicationForm) => {
    if (!resumeFile) {
      alert("Please upload a resume");
      return;
    }
    console.log({ ...data, resume: resumeFile });
    reset();
    setResumeFile(null);
  };

  return (
    <div>
      <h2 className="text-black text-lg font-semibold my-4">Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormField
            register={register}
            className="flex-1"
            label="First Name"
            name="firstName"
            errorText={errors.firstName?.message}
          />
          <FormField
            register={register}
            className="flex-1"
            label="Last Name"
            name="lastName"
            errorText={errors.lastName?.message}
          />
        </div>
        <FormField
          type="email"
          register={register}
          label="Email"
          name="email"
          errorText={errors.email?.message}
        />
        <FormField
          type="textarea"
          register={register}
          label="Cover Letter"
          name="coverLetter"
          errorText={errors.coverLetter?.message}
        />
        <div>
          <Label htmlFor="resume">Resume</Label>
          <Input
            id="resume"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setResumeFile(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="my-4">
          <Button className="w-full">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default VacancyApplyPage;
