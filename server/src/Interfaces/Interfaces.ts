export interface ICollege {
  collegename: string;
  SpecialisedIn: string;
  status?: string;
  lastModified?: string;
}

export interface IDetails {
  collegeName: string;
  address: IAddress;
  logo: string;
  description: string;
  meta: string;
  keywords: string[];
  programs: string[];
  images: [string, 'active' | 'inactive'][];
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
