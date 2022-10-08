export interface ICollege {
  collegename: string;
  SpecialisedIn: string;
  status?: string;
  lastModified?: ITime;
}

export interface ITime {
  timeToShow: string;
  ms: number;
}

export interface CollegesIS {
  status: string;
  state: string;
  district: string;
  category: string;
  collegesData: ICollege[] | null;
  order: "asc" | "desc";
}

export interface DetailsIS {
  collegeName: string;
}

export interface IDetails {
  collegeName: string;
  address: IAddress;
  logo: string;
  description: string;
  meta: string;
  keywords: string[];
  programs: string[];
  images: [string, "active" | "inactive"][];
  links: [string, string][];
  naacGrade: string;
  nirfReport: string;
  contactNumber: string;
  emailAddress: string;
  events: [string, string, string, string][];
  teachers: [string, string, string, string, string, string, string][];
  reports: [string, string, string, string][];
}

interface IAddress {
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pinCode: string;
  latitude: string;
  longitude: string;
}

export interface IIvent {
  title: string;
  date: string;
  link: string;
  image: string;
}

export interface IEditEvent extends IIvent {
  id: string;
}

export interface ITeacher {
  name: string;
  designation: string;
  photo: string;
  qualification: string;
  description: string;
  papers: string;
  books: string;
}

export interface IEditTeacher extends ITeacher {
  id: string;
}

export interface IReport {
  name: string;
  date: string;
  link: string;
  image: string;
}

export interface IEditReport extends IReport {
  id: string;
}
