import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { NotificationDisplay } from "./components/common/NotificationDisplay";
import { shouldHideNavAndFooter } from "./utility/withoutNavAndFooter/notNav";

const App = () => {
  const { pathname } = useLocation();
  const hideNavAndFooter = shouldHideNavAndFooter(pathname);

  return (
    <div>
      {/* React Hot Toast Provider */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
            },
          },
          warning: {
            duration: 3000,
            style: {
              background: "#f59e0b",
            },
          },
          loading: {
            color: "#0ea5e9",
          },
        }}
      />

      <NotificationDisplay />
      {!hideNavAndFooter && <Navbar />}
      <AppRoutes />
      {!hideNavAndFooter && <Footer />}
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
