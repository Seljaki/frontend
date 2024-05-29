import { SERVER_URL } from "../../constants/http";

export async function getAllJobTypes(authToken) {
  const data = await fetch(SERVER_URL + '/jobTypes', {
    headers: {
      "x-auth-token": authToken
    }
  });
  if (data.status < 300) {
    const json = await data.json();
    return json.jobTypes;
  }
  return []
}