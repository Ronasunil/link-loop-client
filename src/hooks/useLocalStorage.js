import { useState } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : undefined;
      setValue(parsedValue);
    } catch {
      setValue(undefined);
    }
  });

  const add = function (value) {
    try {
      const jsonValue = JSON.stringify(value);
      window.localStorage.setItem(key, jsonValue);
      setValue(value);
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
