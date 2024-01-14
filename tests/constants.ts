import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export const testDataApiEndpoint = process.env.API_URL;
export const apiGraphQL = `${testDataApiEndpoint}/graphql`;
