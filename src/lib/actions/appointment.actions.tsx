"use server";
import { parseStringify } from "../../../lib/utils";
import { prisma } from "../appwrite.config";
import { revalidatePath } from "next/cache";

export const CreateAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId: appointment.patientId,
        primaryPhysician: appointment.primaryPhysician,
        reason: appointment.reason || "",
        status: appointment.status || "pending",
        notes: appointment.notes,
        appointmentDate: appointment.appointmentDate
          ? new Date(appointment.appointmentDate)
          : null,
      },
    });
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true },
    });

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: { patient: true },
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce(
      (
        acc: {
          scheduledCount: number;
          pendingCount: number;
          cancelledCount: number;
        },
        appointment: any
      ) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("Error fetching recent appointments:", error);
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: appointment.status,
        cancellationReason: appointment.cancellationReason,
        notes: appointment.notes,
      },
    });

    if (!updateAppointment) {
      throw new Error("Appointment not found");
    }

    // TODO SMS notification
    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
