"use client";

import type { ChangeEvent } from "react";

export default function ClubSearchInput() {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    void event.target.value;
  };

  return (
    <input
      className="search_input"
      id="club_search"
      type="text"
      placeholder="Search by club name, location or time..."
      onChange={handleSearch}
      autoComplete="off"
    />
  );
}
