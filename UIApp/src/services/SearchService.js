import http from "../http-common";

const get = (searchKey, location) => {
  if (location === undefined || location === "") {
    return http.get(`/search?searchKey=${searchKey}`);
  }
  else {
    const [city, state] = location.split(', ');
    return http.get(`/search?searchKey=${searchKey}&city=${city}&state=${state}`);
  }
};

const getRelevantSkillSet = (searchKey,userId) => {
  return http.get(`/search/getRelevantSkillSet?searchKey=${searchKey}&userId=${userId}`);
};

export default {
  get,
  getRelevantSkillSet
};
