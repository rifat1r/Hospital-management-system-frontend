const commonFields = {
  headers: ["Name", "Role"],
  row: (user) => [user.name, user.role],
};
// This configuration object defines the headers and row data for different user types.

const userFieldConfig = {
  doctor: {
    headers: [
      ...commonFields.headers,
      "Specialization",
      "Appointments",
      "Created By",
    ],
    row: (doctor) => [
      ...commonFields.row(doctor),
      doctor.designation,
      doctor.appointments?.length,
      doctor.createdBy,
    ],
  },
  admin: {
    headers: [...commonFields.headers, "Created By"],
    row: (admin) => [...commonFields.row(admin), admin.createdBy],
  },
  patient: {
    headers: [...commonFields.headers, "Age", "Appointments"],
    row: (patient) => [
      ...commonFields.row(patient),
      patient.age,
      patient.appointments?.length,
    ],
  },
};

export default userFieldConfig;
