export interface ICollege {
  collegename: string;
  SpecialisedIn: string;
}

export interface CollegesIS {
  collegesData: ICollege[] | null;
}

export interface DetailsIS {
  collegeName: string;
}
