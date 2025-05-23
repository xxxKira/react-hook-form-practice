type Create = {
  variant: 'create';
};
type Edit = {
  variant: 'edit';
  id: number;
};

export type Common = {
  name: string;
  email: string;
  cities: number[];
  languages: number[];
  gender: string;
  skills: number[];
  registrationDateAndTime: Date;
  formerEmploymentPeriod: [Date, Date];
  salaryRange: [number, number];
  isTeacher: boolean;
  students?: { name: string }[];
};

export type ApiCreateEdit = Common & (Create | Edit);
export type ApiGet = Edit & Common;
