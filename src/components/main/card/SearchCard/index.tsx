"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SearchList } from "./SearchList";
import { fetchSearch } from "@/lib/fetch/posts";

export const SearchCard = () => {
  const [search, setSearch] = useState("");
  const [searchResponse, setSearchResponse] = useState<IPost[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const searchResponse = await fetchSearch(debouncedSearch.trim());
      setSearchResponse(searchResponse);
    };

    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  return (
    <article className={`card-shadow ${styles.card}`}>
      <div className={styles.search}>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          className={styles.search_input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        {search.length > 0 && (
          <FontAwesomeIcon
            icon={faClose}
            cursor={"pointer"}
            onClick={() => setSearch("")}
          />
        )}
      </div>

      <SearchList searchResponse={searchResponse} />
    </article>
  );
};
