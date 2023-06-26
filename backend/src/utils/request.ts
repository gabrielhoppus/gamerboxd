import axios from 'axios';
import { requestError } from '@/errors/request.error';

interface ApiError {
  status: number;
  statusText: string;
}

async function get(url: string) {
  try {
    const result = await axios.get(url);
    return result;
  } catch (error: any) {
    const { status, statusText } = error.response as ApiError;

    return requestError(status, statusText);
  }
}

export const request = {
  get,
};