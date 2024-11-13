export function useLocalStorage(key) {
  const add = function (value) {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue);
      window.localStorage.setItem(key, jsonValue);
      return jsonValue;
    } catch (err) {
      console.log(err.message);
    }
  };

  const remove = function () {
    try {
      console.log("lop");
      window.localStorage.removeItem(key);
    } catch (err) {
      console.log(err.message);
    }
  };

  return [remove, add];
}
