import { userInterface } from "../types/userInterface";

const user = ({ username, email, password, contact }: userInterface) => {
  return {
    getUsername: () => username,
    getEmail: () => email,
    getPassword: () => password,
    getContact: () => contact,
  };
};

export default user;
