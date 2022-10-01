export interface ICollege {
  collegename: string;
  SpecialisedIn: string;
}

export interface InitialState {
  collegesData: ICollege[] | null;
}
