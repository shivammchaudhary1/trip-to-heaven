export const withoutNavAndFooterRoutes = [
  "/register",
  "/login",
  "/forget-password",
];

export const shouldHideNavAndFooter = (pathname = "") => {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return withoutNavAndFooterRoutes.includes(normalizedPath);
};
