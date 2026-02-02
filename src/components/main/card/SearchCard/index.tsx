"use client";

import { Suspense, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SearchList, SkeletonSearchList } from "./SearchList";
import { getSearchedPost } from "@/app/api/posts";
import { useTranslation } from "@/hooks/useTranslation";

export const SearchCard = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [searchResponse, setSearchResponse] = useState<IPost[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const searchResponse = await getSearchedPost(debouncedSearch.trim());
      setSearchResponse(searchResponse);
    };

    if (debouncedSearch) {
      fetchData();
    }

    setIsLoading(false);
  }, [debouncedSearch]);

  return (
    <article className={`card-shadow ${styles.card}`}>
      <div className={styles.search}>
        <input
          id="search"
          type="text"
          name="search"
          placeholder={t("main.searchCard.placeholder")}
          className={styles.search_input}
          value={search}
          onChange={(e) => {
            setIsLoading(true);
            setSearch(e.target.value);
          }}
          autoComplete="off"
        />
        {search.length > 0 && (
          <FontAwesomeIcon icon={faClose} cursor={"pointer"} onClick={() => setSearch("")} />
        )}
      </div>

      {isLoading ? (
        <SkeletonSearchList />
      ) : (
        <SearchList search={search} searchResponse={searchResponse} />
      )}
    </article>
  );
};
