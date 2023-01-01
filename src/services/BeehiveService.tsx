import utitlities from "../utilities/utilities.js";
import { Content, Graphs, IBeehives } from "../types/beehive/IBeehives.js";
import { AxiosResponse } from "axios";
import { IBeehive } from "../types/beehive/IBeehive.js";

export const get = async (
  limit: number
): Promise<AxiosResponse<IBeehives, any>> => {
  try {
    const response = await utitlities.axios.get<IBeehives>(
      `/beehouses?limit=${limit}`
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const getStats = async (
  id: string
): Promise<AxiosResponse<Graphs, any>> => {
  try {
    const response = await utitlities.axios.get<Graphs>(`/${id}/stats`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const getStatsHourly = async (
  id: string,
  limit: string,
  from: string
): Promise<AxiosResponse<Graphs, any>> => {
  try {
    const response = await utitlities.axios.get<Graphs>(
      `/${id}/stats?limit=${limit}&from=${from}`
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const getById = async (
  id: string | undefined
): Promise<AxiosResponse<IBeehive, any>> => {
  try {
    const response = await utitlities.axios.get<IBeehive>(`/beehouses/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const deleteSomething = async (
  id: string
): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await utitlities.axios.delete(`/beehouses/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const save = async (
  body: any
): Promise<AxiosResponse<IBeehives, any>> => {
  try {
    const response = await utitlities.axios.post<IBeehives>("/beehouses", body);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const update = async (
  id: string | undefined,
  body: any
): Promise<AxiosResponse<IBeehives>> => {
  try {
    const response = await utitlities.axios.put<IBeehives>(
      `/beehouses/${id}`,
      body
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};
const BeehiveService = {
  get,
  getStats,
  getStatsHourly,
  getById,
  deleteSomething,
  save,
  update,
};
export default BeehiveService;
