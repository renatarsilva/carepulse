// Types for Prisma models
export type Gender = "male" | "female" | "other";
export type Status = "pending" | "scheduled" | "cancelled";

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string | null;
  gender: string | null;
  address: string | null;
  occupation: string | null;
  emergencyContactName: string | null;
  emergencyContactNumber: string | null;
  primaryPhysician: string | null;
  insuranceProvider: string | null;
  insurancePolicyNumber: string | null;
  allergies: string | null;
  currentMedication: string | null;
  familyMedicalHistory: string | null;
  pastMedicalHistory: string | null;
  identificationDocumentId: string | null;
  identificationDocumentUrl: string | null;
  privacyConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: Patient;
  primaryPhysician: string;
  reason: string;
  status: Status;
  notes: string | null;
  cancellationReason: string | null;
  appointmentDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type User = {
  id: string;
  email: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
