const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rgsscs.org";

const REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register/`;

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  code: string;
}


export interface RegisterSuccess {
  user?: {
    id: number | string;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  refresh?: string;
  access?: string;
  detail?: string;
}

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterPayload | "non_field_errors" | "detail", string[]>
>;

export class RegisterError extends Error {
  readonly status: number;
  readonly fieldErrors: RegisterFieldErrors;

  constructor(status: number, fieldErrors: RegisterFieldErrors) {
    const firstMessage =
      Object.values(fieldErrors).flat()[0] ?? "Registration failed.";
    super(firstMessage);
    this.name = "RegisterError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

const USERNAME_MAX_LENGTH = 150;
const NAME_MAX_LENGTH = 150;
const USERNAME_PATTERN = /^[\w.@+-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterPayload(
  payload: RegisterPayload
): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};

  if (!payload.username?.trim()) {
    errors.username = ["This field is required."];
  } else if (payload.username.length > USERNAME_MAX_LENGTH) {
    errors.username = [
      `Ensure this field has no more than ${USERNAME_MAX_LENGTH} characters.`,
    ];
  } else if (!USERNAME_PATTERN.test(payload.username)) {
    errors.username = [
      "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.",
    ];
  }

  if (!payload.email?.trim()) {
    errors.email = ["This field is required."];
  } else if (!EMAIL_PATTERN.test(payload.email)) {
    errors.email = ["Enter a valid email address."];
  }

  if (!payload.password) {
    errors.password = ["This field is required."];
  }

  if (!payload.password2) {
    errors.password2 = ["This field is required."];
  } else if (payload.password && payload.password !== payload.password2) {
    errors.password2 = ["Passwords do not match."];
  }

  if (payload.first_name && payload.first_name.length > NAME_MAX_LENGTH) {
    errors.first_name = [
      `Ensure this field has no more than ${NAME_MAX_LENGTH} characters.`,
    ];
  }

  if (payload.last_name && payload.last_name.length > NAME_MAX_LENGTH) {
    errors.last_name = [
      `Ensure this field has no more than ${NAME_MAX_LENGTH} characters.`,
    ];
  }

  if (!payload.code?.trim()) {
    errors.code = ["This field is required."];
  }

  return errors;
}

export async function register(
  payload: RegisterPayload,
  options?: { signal?: AbortSignal }
): Promise<RegisterSuccess> {
  const clientErrors = validateRegisterPayload(payload);
  if (Object.keys(clientErrors).length > 0) {
    throw new RegisterError(400, clientErrors);
  }

  let response: Response;
  try {
    response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
      signal: options?.signal,
    });
  } catch (networkError) {
    throw new RegisterError(0, {
      non_field_errors: [
        "Unable to reach the server. Check your connection and try again.",
      ],
    });
  }

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
  }

  if (!response.ok) {
    const fieldErrors: RegisterFieldErrors =
      data && typeof data === "object"
        ? (data as RegisterFieldErrors)
        : {
            non_field_errors: [
              `Registration failed with status ${response.status}.`,
            ],
          };
    throw new RegisterError(response.status, fieldErrors);
  }

  return (data ?? {}) as RegisterSuccess;
}