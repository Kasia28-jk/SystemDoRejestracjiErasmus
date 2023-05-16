import { UniversityModel } from "./university.model";

export interface ApplicationResponse {
    id: string;
    phoneNumber: string;
    email: string;
    status: string;
    universities: UniversityModel[];
    files: FileTypes[]
  }

  export interface FileTypes {
    file_name: string
    download_url: string
    }

    export interface AplicationStatus {
      applicationId: string
      status: string
      }