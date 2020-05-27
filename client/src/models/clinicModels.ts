export interface Location {
  name: string;
  address: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface ClinicBase {
  name: string;
  isActive: boolean;
  locations: Location[];
}

export interface Clinic extends ClinicBase {
  id: string;
}
