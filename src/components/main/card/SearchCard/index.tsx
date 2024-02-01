"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const SearchCard = () => {
  const [search, setSearch] = useState("");

  return (
    <article className={styles.card}>
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className={styles.search_input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <FontAwesomeIcon icon={faClose} onClick={() => setSearch("")} />
        )}
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </article>
  );
};
