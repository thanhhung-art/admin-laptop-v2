import { ChangeEvent } from "react";

export function isPasswordStrong(password: string) {
  switch (true) {
    case !/[A-Z]/.test(password):
      return 'password must have uppercase letter'
    case !/[a-z]/.test(password):
      return 'password must have lowercase letter'
    case !/[0-9]/.test(password):
      return 'password must have number'
    case !/[!@#$%^&*]/.test(password):
      return 'password must have special character !@#$%^&*'
    case password.length < 8:
      return 'password must have at least 8 character'
    default: 
      return ""
  }
}
