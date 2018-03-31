import axios from "axios";

export const getDrivingDistance = async (
  { origins, destinations },
  callback
) => {
  try {
    const url = "https://stormy-thicket-48933.herokuapp.com/distance";
    const params = {
      origins,
      destinations
    };
    const { data } = await axios.post(url, params);
    callback(data);
  } catch (error) {
    callback({ error: "Check your input. Heroku might be asleep. Try again!" });
  }
};
