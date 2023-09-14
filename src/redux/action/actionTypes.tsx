import { SHOW_PROGRESS, RECEIVE_DATA } from "./constain";

export function addPerson(person) {
  return {
    type: "SHOW_PROGRESS",
    data: person,
  };
}
export function deletePerson(person) {
  return {
    type: "RECEIVE_DATA",
    data: person,
  };
}
