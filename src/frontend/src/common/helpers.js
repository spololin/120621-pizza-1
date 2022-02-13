import resources from "@/common/enums/resources";
import { AuthApiService } from "@/services/api.auth.service";
import { BuilderApiService } from "@/services/api.builder.service";
import { CrudApiService, ReadOnlyApiService } from "@/services/api.service";

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
    [resources.ADDRESSES]: new CrudApiService("addresses"),
    [resources.ORDERS]: new CrudApiService("orders"),
  };
};

export const validateEmail = (email = "") => {
  return String(email)
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePhone = (phone = "") => {
  return String(phone)
    .trim()
    .toLowerCase()
    .match(
    /^(\+7|7|8)?[\s|-]?\(?[9][0-9]{2}\)?[\s|-]?[0-9]{3}[\s|-]?[0-9]{2}[\s|-]?[0-9]{2}$/,
    );
};

export const validateReceivingFormData = (data) => {
  for (const elem in data) {
    if (["street", "building"].includes(elem) && !data[elem]) {
      return false;
    }
  }

  return true;
};

export const receivingDefaultTypes = () => ([
  {
    id: "myself",
    name: "Заберу сам",
  },
  {
    id: "new",
    name: "Новый адрес",
  },
]);

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('User/getMe');
};
