import { ErrorHandler } from "../../utils/Logging";

//general Auths
export const RenewToken = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;
        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
//Owner auths
export const NewOwner = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler(NewOwner)({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler(NewOwner)({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler(NewOwner)({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
export const LoginOwner = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
//admin auths
export const NewAdmin = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
export const LoginAdimin = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
//staff auths
export const NewStaff = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
export const LoginStaff = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
//parent/student auths
export const NewClient = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler()({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        }).UserResponse();
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler()({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          }).UserResponse();
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
export const LoginClient = async (req, res) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the root function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name:
    Function requested Parameters:
    Function Expected Output:
    Created-by: NexusWings🔥
    `;
  try {
    const {} = req.body;
    const {} = req.user;
    // Error Handling
    const calls = [
      /*Format
            {
            id: this is the variable being called ,
            name: this is the name you want the varaible to be denoted as,
            rule: this is the checker on the variable,
            instruction: in case the checker returns false, this is the custom instruction given to the user
            } */
    ];
    let message = "";
    calls.forEach((element) => {
      if (!element.id) {
        message = `${element.name} Not Found!`;

        ErrorHandler(LoginClient)({
          documentation: doc,
          custom_error_message: message,
          status_code: 401,
          _response: res,
        });
        message = "";
        return;
      }
      if (element.rule != undefined && element.instruction != undefined) {
        if (!element.rule) {
          message = element.instruction;
          ErrorHandler(LoginClient)({
            documentation: doc,
            custom_error_message: message,
            status_code: 401,
            _response: res,
          });
          message = "";
          return;
        }
      }
    });
  } catch (error) {
    console.error("Server Error :", error);
    ErrorHandler()({
      documentation: doc,
      error_message: error,
      custom_error_message: "Server Error: Please Try Again",
      _response: res,
      status_code: 501,
    }).UserResponse();
  }
};
