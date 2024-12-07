import { ApplicationStatus } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const crypto = require("crypto");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | undefined | null) {
  if (!name) return "😃";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function getApplicationStatusLabel(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.PENDING:
      return "În așteptare";
    case ApplicationStatus.ACCEPTED:
      return "Acceptat";
    case ApplicationStatus.ATTENDING:
      return "Particip la training";
    case ApplicationStatus.NOT_ATTENDING:
      return "Nu particip la training";
    case ApplicationStatus.REJECTED:
      return "Respins";
    default:
      return "Necunoscut";
  }
}

export function getApplicationStatusColor(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.PENDING:
      return "text-yellow-600 bg-yellow-100";
    case ApplicationStatus.ACCEPTED:
      return "text-green-600 bg-green-200";
    case ApplicationStatus.NOT_ATTENDING:
    case ApplicationStatus.REJECTED:
      return "text-red-600 bg-red-200";
    case ApplicationStatus.ATTENDING:
      return "text-indigo-600 bg-indigo-200";
    default:
      return "text-yellow-600";
  }
}

export function encrypt(text: string) {
  var cipher = crypto.createCipher("aes-256-cbc", "d6F3dsfEfeq");
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

export function decrypt(text: string) {
  var decipher = crypto.createDecipher("aes-256-cbc", "d6F3dsfEfeq");
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}
