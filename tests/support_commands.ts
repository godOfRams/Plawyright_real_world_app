import axios from "axios";
import { testDataApiEndpoint } from "./constants.ts";

export const db_seed = async () => {
  // seed database with test data
  console.log(testDataApiEndpoint)
  const { data } = await axios.post(`${testDataApiEndpoint}/testData/seed`);
  return data;
};

export const visualSnapshot = async (maybeName) => {
  // seed database with test data
  console.log(testDataApiEndpoint)
  const { data } = await axios.post(`${testDataApiEndpoint}/testData/seed`);
  return data;
};