import AppRoutes from "./appRoutes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { NotificationDisplay } from "./components/common/NotificationDisplay";

const App = () => {
  return (
    <div>
      <NotificationDisplay />
      <Navbar />
      <AppRoutes />
    </div>
  );
};

/*
  HOW TO USE NOTIFY:
  
  In any component, import the notify action:
  import { useDispatch } from "react-redux";
  import { notify } from "./app/slices/notify.slice";
  
  Then use in your component:
  
  const dispatch = useDispatch();
  
  // Success notification
  dispatch(notify({ type: "success", message: "Logged in successfully" }));
  
  // Failure notification
  dispatch(notify({ type: "failure", message: "Login failed" }));
  
  // Warning notification
  dispatch(notify({ type: "warning", message: "Please verify your email" }));
  
  // Info notification
  dispatch(notify({ type: "info", message: "Processing your request" }));
  
  The notification will auto-dismiss after 3 seconds.
*/

export default App;
