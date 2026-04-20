"use server";
import { prisma } from "../appwrite.config";
import { parseStringify } from "../../../lib/utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return parseStringify(existingUser);
    }

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        phone: user.phone,
        name: user.name,
      },
    });

    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });

    return parseStringify(patient);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  birthDate,
  ...patient
}: RegisterUserParams) => {
  try {
    let identificationDocumentUrl = null;

    // If you have file upload service, handle it here
    // For now, we'll just skip file handling
    if (identificationDocument) {
      console.log(
        "File upload would be handled here with S3 or similar service"
      );
      // Example: identificationDocumentUrl = await uploadToS3(identificationDocument);
    }

    const newPatient = await prisma.patient.create({
      data: {
        ...patient,
        birthDate:
          birthDate instanceof Date
            ? birthDate.toISOString().split("T")[0]
            : birthDate,
        identificationDocumentUrl: identificationDocumentUrl || null,
      },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
