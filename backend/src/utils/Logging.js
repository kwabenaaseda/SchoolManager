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
    if(!_response){
      return console.log(
        "Developer Notice: please provide Response identifier for Automated Response Functionality to work"
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

export const SuccesHandler = (fn)=>({
  _response,
  statusCode,
  adjustment,
  successMessage,
})=>{
if(!_response){
      return console.log(
        "Developer Notice: please provide Response identifier for Automated Response Functionality to work"
      );
    }
  const ForUser={
    status: statusCode?statusCode:200,
      message: `Server Success: ${successMessage?successMessage:"Operation Successful !"}`,
      success:true
  }
  return{
    UserResponse:()=>{
      _response.status(statusCode?statusCode:200)({...ForUser,...adjustment})
      return
    }
  }
}
