import { ErrorHandler, SuccesHandler } from "../../utils/Logging.js";

export const Create_New_User = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the Create_New_User function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name: Create_New_User
    Location: Auth.controller.js
    Function requested Parameters: ---
    Function Expected Output:---
    
    Created-by: NexusWings🔥
    `;

  try {
    var { firstName, lastName, email, password } = req.body;
    const calls = [
      {
        id: firstName,
        name: "firstname",
        rule: firstName.length > 3,
        instruction: "firstname must be more than 3 characters",
      },
      {
        id: lastName,
        name: "lastname",
        rule: lastName.length >= 3,
        instruction: "lastname must be more than 3 characters",
      },
      {
        id: email,
        name: "email",
        rule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        instruction:
          "Format of mail is xxxx@xxxx.xxx. Example: test@testing.com",
      },
      {
        id: password,
        name: "password",
        rule: password.length > 8,
        instruction: "password must be more than 8 characters",
      },
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name.toLocaleUpperCase()} Not Provided`;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
        }
      }
    });
    if (message != "") {
      ErrorHandler(Create_New_User)({
        _response: res,
        error_message: message,
        custom_error_message: message,
        status_code: 403,
        documentation: doc,
      }).UserResponse();

      console.log(
        `Logging: Failure in Signup due to invalid credentials: ${message}`
      );
      message = "";
      return;
    }
    
  } catch (error) {
    ErrorHandler(Create_New_User)({
      documentation: doc,
      error_message: error,
      _response: res,
      status_code: 404,
      custom_error_message: "Server Time-Out. Please Try Again!",
    }).UserResponse();
  }
};
