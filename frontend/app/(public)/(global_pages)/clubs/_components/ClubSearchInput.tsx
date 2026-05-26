"use client";

import type { ChangeEvent } from "react";

type ClubSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ClubSearchInput({
  value,
  onChange,
}: ClubSearchInputProps) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="search_input"
      id="club_search"
      type="text"
      value={value}
      placeholder="Search by club name, location or time..."
      onChange={handleSearch}
      autoComplete="off"
    />
  );
}
