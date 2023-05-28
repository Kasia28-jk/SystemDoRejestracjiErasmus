import {ApplicationStatus} from "./application-status.enum";

export interface ApplicationModel {
  universities: string[],
  creationDate: Date,
  name: string,
  surname: string,
  applicationStatus: ApplicationStatus,
  applicationStatusLabel: string,
  additionalInformation: string
}
