import resources from "@/common/enums/resources";
import { AuthApiService } from "@/services/api.auth.service";
import { BuilderApiService } from "@/services/api.builder.service";
import { ReadOnlyApiService } from "@/services/api.service";

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.BUILDER]: new BuilderApiService([
      resources.INGREDIENTS,
      resources.DOUGHS,
      resources.SAUCES,
      resources.SIZES,
    ]),
    [resources.MISC]: new ReadOnlyApiService("misc"),
  };
};


export const validateEmail = (email = "") => {
  return String(email)
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
