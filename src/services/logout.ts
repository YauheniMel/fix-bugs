import { API } from "~/constants";
import getUrl from "~/utils/getUrl";

const logout = async () => {
  await fetch(getUrl(API.Logout), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })

  localStorage.removeItem('token');
};

export default logout;
