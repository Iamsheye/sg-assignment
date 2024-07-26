import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { options } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchIcon } from "@/assets/svgs";

type SortOptions = "default" | "asc" | "desc";

type FilterOptions = {
  search: string;
  sort: string;
  educationLevel: string[];
  experienceLevel: string[];
  city: string[];
  sector: string[];
};

type ISidebarProps = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  filters: any;
  className: string;
  setFilters: Dispatch<SetStateAction<FilterOptions>>;
};

const Sidebar = ({
  className,
  sidebarRef,
  filters,
  setFilters,
}: ISidebarProps) => {
  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-100 border-r p-6 flex flex-col gap-6 h-[100dvh] overflow-y-scroll md:sticky md:top-0 absolute transition-transform duration-300 ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          type="search"
          placeholder="Search jobs..."
          className="w-full rounded-md pl-10 pr-4 py-2 text-sm focus-visible:ring-blue-500"
        />
      </div>
      <Accordion
        type="multiple"
        defaultValue={["item-1"]}
        className="flex flex-col gap-2">
        <AccordionItem
          value="item-1"
          className="border-b-0 rounded-lg px-3 border bg-white">
          <AccordionTrigger className="hover:no-underline py-3">
            <h2 className="font-semibold text-sm">Sort Date</h2>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={filters.sort}
              onValueChange={(val: SortOptions) =>
                setFilters((prev) => ({ ...prev, sort: val }))
              }>
              {["default", "asc", "desc"].map((sort) => (
                <div key={sort} className="flex items-center gap-2">
                  <RadioGroupItem value={sort} id={sort} />
                  <Label htmlFor={sort} className="capitalize">
                    {sort}
                    {sort !== "default" && "ending"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="border-b-0 rounded-lg px-3 border bg-white">
          <AccordionTrigger className="hover:no-underline py-3">
            <h2 className="font-semibold text-sm">City</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            {options.city.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox
                  id={level}
                  checked={filters.city.includes(level)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      city: checked
                        ? [...prev.city, level]
                        : prev.city.filter((l) => l !== level),
                    }));
                  }}
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="border-b-0 rounded-lg px-3 border bg-white">
          <AccordionTrigger className="hover:no-underline py-3">
            <h2 className="font-semibold text-sm">Education Level</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            {options.educationLevel.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox
                  id={level}
                  checked={filters.educationLevel.includes(level)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      educationLevel: checked
                        ? [...prev.educationLevel, level]
                        : prev.educationLevel.filter((l) => l !== level),
                    }));
                  }}
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="border-b-0 rounded-lg px-3 border bg-white">
          <AccordionTrigger className="hover:no-underline py-3">
            <h2 className="font-semibold text-sm">Experience Level</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            {options.experienceLevel.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox
                  id={level}
                  value={level}
                  checked={filters.experienceLevel.includes(level)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      experienceLevel: checked
                        ? [...prev.experienceLevel, level]
                        : prev.experienceLevel.filter((l) => l !== level),
                    }));
                  }}
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="border-b-0 rounded-lg px-3 border bg-white">
          <AccordionTrigger className="hover:no-underline py-3">
            <h2 className="font-semibold text-sm">Sector</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            {options.sector.map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox
                  id={level}
                  checked={filters.sector.includes(level)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      sector: checked
                        ? [...prev.sector, level]
                        : prev.sector.filter((l) => l !== level),
                    }));
                  }}
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
