import React from "react";
import style from "../Components/Style/Page.module.css";

/**
 * Global Card component used for presenting options, especially in the Auth page.
 * @param {string} operationType - SYSTEM_SIGNUP or TENANT_LOGIN
 * @param {object} Contentdata - Title, description, buttonName
 * @param {function} setFlow - Function to update the parent's flow state
 */
const Card = ({
  operationType,
  Contentdata,
  setFlow,
}) => {
  
  // The toggle function now directly sets the new flow state in the parent
  const toggle = () => {
    setFlow(operationType);
  };

  return (
    <div className={style.card}>
      <h2>{Contentdata.title ? Contentdata.title : "Test"}</h2>
      <p>{Contentdata.description}</p>
      <button onClick={toggle} className={style.authSubmitButton}>
        {Contentdata.buttonName ? Contentdata.buttonName : "Continue"}
      </button>
    </div>
  );
};

export default Card;