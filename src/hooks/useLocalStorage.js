import { useState } from "react";

export function useLocalStorage(key, initalValue) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : initalValue;
      return parsedValue;
    } catch {
      return undefined;
    }
  });

  const add = function (value) {
    try {
      const jsonValue = JSON.stringify(value);
      window.localStorage.setItem(key, jsonValue);
    } catch (err) {
      console.log(err.message);
    }
  };

  const remove = function () {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  return [remove, add, value];
}
