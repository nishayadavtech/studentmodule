const parseJson = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const normalizeStudentProfile = (profile) => {
  if (!profile || typeof profile !== "object") {
    return null;
  }

  const studentId =
    profile.student_id ??
    profile.id ??
    profile.user_id ??
    profile.userId ??
    profile.studentId ??
    profile.studentID ??
    "";

  return {
    ...profile,
    student_id: studentId ? Number(studentId) || String(studentId) : "",
    id: profile.id ?? studentId ?? "",
    user_id: profile.user_id ?? studentId ?? "",
    name: profile.name || profile.student_name || profile.full_name || "",
    email: profile.email || profile.mail || "",
  };
};

export const extractStudentAuthPayload = (payload) => {
  const student =
    payload?.student ||
    payload?.user ||
    payload?.profile ||
    payload?.data?.student ||
    payload?.data?.user ||
    payload?.data ||
    null;

  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.access_token ||
    payload?.jwt ||
    "";

  return {
    student: normalizeStudentProfile(student),
    token,
  };
};

export const saveStudentSession = (payload) => {
  const { student, token } = extractStudentAuthPayload(payload);

  if (student) {
    localStorage.setItem("student", JSON.stringify(student));
  }

  if (token) {
    localStorage.setItem("studentToken", token);
  }

  return student;
};

export const getStoredStudent = () => {
  return normalizeStudentProfile(parseJson(localStorage.getItem("student"), null));
};

export const getStoredStudentId = () => {
  const student = getStoredStudent();
  return student?.student_id || "";
};

export const clearStudentSession = () => {
  localStorage.removeItem("student");
  localStorage.removeItem("studentToken");
  localStorage.removeItem("postLoginRedirectPath");
  localStorage.removeItem("pendingCartCourseId");
  localStorage.removeItem("pendingEnrollCourseId");
};
