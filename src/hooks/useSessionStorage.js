import { useState } from "react";

export function useSessionStorage(key) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = window.sessionStorage.getItem(key);
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : undefined;
      return parsedValue;
    } catch {
      return undefined;
    }
  });

  const add = function (value) {
    try {
      const jsonValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, jsonValue);
      setValue(value);
    } catch (err) {
      console.log(err);
    }
  };

  const remove = function () {
    try {
      window.sessionStorage.removeItem(key);
      setValue(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  return [remove, add, value];
}
