import axios from "axios";

export const getDrivingDistance = async params => {
  try {
    const url = "https://stormy-thicket-48933.herokuapp.com/distance";
    const params = {
      origins: "5454 Rosewood Street, Montclair, CA 91763",
      destinations: "138 S Adams St, Glendale"
    }
    const { data } = await axios.post(url, params);
    console.log("data:", data);
  } catch (e) {
    console.warn(e);
  }
};
