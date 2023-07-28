import { response } from "express";
import user from "../../../entities/user";
import { userInterface } from "../../../types/userInterface";

const registerUser = async (
  username: string,
  email: string,
  password: string,
  contact: string,
  userRepository: any,
  authService: any
) => {
  const newUser: userInterface = {
    username,
    email,
    password,
    contact,
  };

  // Use the authService to encrypt the password and assign it to the newUser object
  newUser.password = await authService.encryptPassword(password);

  console.log(newUser);

  const createdUser = user(newUser);

  return userRepository
    .getUserByProperty("email", email)
    .then((response: string | any[]) => {
      if (response.length) {
        throw new Error(`user with email ${email} already exists!`);
      }
      return userRepository.getUserByProperty("username", username);
    })
    .then((response: string | any[]) => {
      if (response.length) {
       throw new Error(`user with username ${username} already exists!`);
      }
      return userRepository.getUserByProperty("contact", contact);
    })
    .then((response: string | any[]) => {
      if (response.length) {
        throw new Error(`user with number ${contact} already exists!`);
      }

      return userRepository.registerUser(createdUser);
    });
};

export default registerUser;
