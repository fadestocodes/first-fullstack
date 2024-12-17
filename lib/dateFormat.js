import React from 'react'

export const dateFormat = (string) => {
    const date = new Date(string);
    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    return (
        formattedDate
    )
}
