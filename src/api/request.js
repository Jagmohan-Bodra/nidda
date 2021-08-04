import { URLS } from "./URLS";
import Axios from "axios";

export const getCountry = () => Axios.get(URLS.GET_COUNTRIES);
export const getCities = () =>
  Axios.get(URLS.GET_CITIES, {
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
export const getServices = (data) =>
  Axios.get(URLS.GET_SERVICES + `city_id=${data.city_id}`, data);

export const serviceTask = (data) =>
  Axios.get(URLS.SERVICE_TASK + `selectedService=${data}`);

export const getTask = (data) =>
  Axios.get(URLS.GET_TASK + `service_id=${data.service_id}`, data);

export const tasksTypes = (data) =>
  Axios.get(URLS.TASK_TYPES + `servicetype=${data.serviceType}`);

export const getDeliveryTitle = (data) =>
  Axios.get(
    URLS.GET_DELIVERY_TITLE +
      `&country_id=${data.country_id}&task_id=${data.task_id}`,
    data
  );

export const rightMenus = () => Axios.get(URLS.RIGHT_MENUS);

export const createRequest = (data) => {
  const form = new FormData();
  form.append("deviceModel", data.deviceModel);
  form.append("clarfy", data.clarfy);
  form.append("deviceType", data.deviceType);
  form.append("task", data.task);
  form.append("country_id", data.country_id);
  form.append("city_id", data.city_id);
  form.append("lat", data.lat);
  form.append("lan", data.lan);
  form.append("mobileNumber", data.mobileNumber);
  if (data.image) {
    const image = {
      uri: data.image.uri,
      type: data.image.type,
      name: data.image.name,
    };
    form.append("image", image, image.name);
  }
  return Axios.post(URLS.CREATE_REQUEST, form);
};

export const sendOTP = (data) => Axios.post(URLS.SEND_OTP, data);
export const createStore = (data) => Axios.post(URLS.CREATE_STORE, data);
