export interface PublisherServiceData {
  service_at: string;
  participated: boolean;
  courses: number;
  serves_as: string;
  hours: number;
  credited: number;
  notes: string;
}

export interface PublisherData {
  id: string;
  group_id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  baptized_at: string;
  privileges: Privileges[];
  field_services: PublisherServiceData[];
}

export interface Privileges {
  abbr: string;
  color: string;
  name: string;
  tag: string;
}