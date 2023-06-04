export interface UniversityModel {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  availableLanguages?: string[];
}
