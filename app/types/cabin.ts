export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export enum CabinCapacityFilter {
  All = "all",
  Small = "small",
  Medium = "medium",
  Large = "large",
}
