import {ApplicationStatus} from "./application-status.enum";

export interface ApplicationModel {
  universities: string[],
  creationDate: Date,
  applicationStatus: ApplicationStatus,
  applicationStatusLabel: string,
  additionalInformation: string
}
