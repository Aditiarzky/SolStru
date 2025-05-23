import { AxiosError } from 'axios';

export default function getErrorMessage(error) {
  if (error instanceof AxiosError) return error.response?.data.message;
  return String(error);
}