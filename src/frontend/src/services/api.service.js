import axios from "@/plugins/axios";

export class ReadOnlyApiService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  getResource() {
    return this.#resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  constructor(resource) {
    super(resource);
  }

  async post(entity) {
    const { data } = await axios.post(super.getResource(), entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${super.getResource()}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${super.getResource()}/${id}`);
    return data;
  }
}
