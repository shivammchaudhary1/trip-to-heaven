import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { removeNotification } from "../../app/slices/notify.slice";

export function NotificationDisplay() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notify.notifications);
  const shownNotifications = useRef(new Set());

  useEffect(() => {
    notifications.forEach((notification) => {
      // Only show if not already shown
      if (!shownNotifications.current.has(notification.id)) {
        shownNotifications.current.add(notification.id);

        // Determine toast type
        let toastType = notification.type;
        if (toastType === "failure") {
          toastType = "error";
        }

        // Show the appropriate toast
        if (typeof toast[toastType] === "function") {
          toast[toastType](notification.message);
        } else {
          // Fallback to default toast if type is not recognized
          toast.success(notification.message);
        }

        // Remove from Redux after 3 seconds
        setTimeout(() => {
          shownNotifications.current.delete(notification.id);
          dispatch(removeNotification(notification.id));
        }, 3000);
      }
    });
  }, [notifications, dispatch]);

  return null;
}
