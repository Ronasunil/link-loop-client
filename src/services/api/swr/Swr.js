import instance from "@services/axios";

class Swr {
  fetcherGet(url) {
    return instance.get(url).then((res) => res.data);
  }
}

export const swr = new Swr();
