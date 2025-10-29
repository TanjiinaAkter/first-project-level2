export type TAcademinSemesterName = "Autumn" | "Summer" | "Fall";
export type TAcademicSemesterCode = "01" | "02" | "03";
export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemester = {
  name: TAcademinSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
// service.ts er code eita::: defining semester code before creating to avoid duplicate insert of semester
// type define (type alias)
export type TAcademicSemesterCodeMapper = {
  [key: string]: string;
};
