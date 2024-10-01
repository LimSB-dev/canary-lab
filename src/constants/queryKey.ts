import { Method } from "axios";
import { isUndefined } from "lodash";

type QueryType = "posts" | "tags" | "profile";

const createQuery = (
  method: Method,
  type: QueryType,
  idOrIndex?: string | number
) => ({
  key: isUndefined(idOrIndex)
    ? [`${method}_${type}`, idOrIndex]
    : [`${method}_${type}`],
  url: isUndefined(idOrIndex) ? `${type}/${idOrIndex}` : type,
});

export const QUERY = {
  // posts
  GET_POSTS: createQuery("get", "posts"),
  GET_POST: (index: number) => createQuery("get", "posts", index),
  POST_POST: () => createQuery("post", "posts"),
  PUT_POST: (index: number) => createQuery("put", "posts", index),
  DELETE_POST: (index: number) => createQuery("delete", "posts", index),

  // tags
  GET_TAGS: createQuery("get", "tags"),
  POST_TAG: () => createQuery("post", "tags"),
  PUT_TAG: (id: string) => createQuery("put", "tags", id),
  DELETE_TAG: (id: string) => createQuery("delete", "tags", id),
};
