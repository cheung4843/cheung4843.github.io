import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  return !data.draft;
};

export default postFilter;
