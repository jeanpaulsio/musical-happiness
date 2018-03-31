import axios from "axios";

export const getDrivingDistance = async params => {
  try {
    const url = "https://stormy-thicket-48933.herokuapp.com/distance";
    const params = {
      origins: "Glendale",
      destinations: "Burbank"
    };
    const { data } = await axios.post(url, params);
    console.log("data:", data);
  } catch (e) {
    console.warn(e);
  }
};
