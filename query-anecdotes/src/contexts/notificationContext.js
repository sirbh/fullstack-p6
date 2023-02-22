import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = ()=>{
    const notification = useContext(NotificationContext)[0]
    return notification
}

export const useNotificationDispatch = ()=>{
    const notificationDispatch = useContext(NotificationContext)[1]
    return notificationDispatch
}

export default NotificationContext
