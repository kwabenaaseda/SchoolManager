export const ErrorHandler =
  (fn) =>
  ({
    documentation,
    error_message,
    custom_error_message,
    _response,
    status_code,
    adjustment
  }) => {
   if (!documentation) {
      return console.log(
        "Developer Notice: please provide documentation for logging and debugging"
      );
    }
    const ForDev = {
      Error: `
        ${
          error_message
            ? error_message
            : custom_error_message?custom_error_message:"Server Error Undefined. Please refer to documentation"
        }`,
      statusCode: `${status_code ? status_code : 404}`,
      ReferenceDocumentaion: `
        ${documentation}`,
      source: fn.name,
    };
    const ForUser = {
      status: status_code?status_code:404,
      message: `Server Error: ${custom_error_message?custom_error_message:"Internal Error"}`,
      success:false
    };

    return {
      developerLogging: () => {
        console.error("Developer:", ForDev);
        return ForDev;
      },
      UserResponse: () => {
        console.error("Developer:", ForDev);
        _response.status(status_code?status_code:404).json({ ...ForUser,...adjustment });
        return ForUser;
      },
    }
  };
