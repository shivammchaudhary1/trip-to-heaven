import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { removeNotification } from "../../app/slices/notify.slice";

export function NotificationDisplay() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notify.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      const toastType =
        notification.type === "failure" ? "error" : notification.type;
      toast[toastType](notification.message);

      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 3000);
    });
  }, [notifications, dispatch]);

  return null;

}
