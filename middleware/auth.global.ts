const authFlowRoutes = ["/", "/settings", "/overview", "/ar"];

export default defineNuxtRouteMiddleware((to, from) => {
  const isLogin = true;
  if (!isLogin && !authFlowRoutes.includes(to.path.toLowerCase())) {
    return navigateTo("/");
  }
  // console.log("to");
  // console.log(to.fullPath);
  // console.log("from");
  // console.log(from.fullPath);
});
