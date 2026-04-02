import { onRequestDelete as __api_extra_spends__id__js_onRequestDelete } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/extra-spends/[id].js"
import { onRequestDelete as __api_monthly_expenses__id__js_onRequestDelete } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/monthly-expenses/[id].js"
import { onRequestGet as __api_earnings_js_onRequestGet } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/earnings.js"
import { onRequestPut as __api_earnings_js_onRequestPut } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/earnings.js"
import { onRequestGet as __api_extra_spends_js_onRequestGet } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/extra-spends.js"
import { onRequestPost as __api_extra_spends_js_onRequestPost } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/extra-spends.js"
import { onRequestPost as __api_login_js_onRequestPost } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/login.js"
import { onRequestPost as __api_logout_js_onRequestPost } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/logout.js"
import { onRequestGet as __api_monthly_expenses_js_onRequestGet } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/monthly-expenses.js"
import { onRequestPost as __api_monthly_expenses_js_onRequestPost } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/monthly-expenses.js"
import { onRequestPost as __api_register_js_onRequestPost } from "/Users/jeremiah/Documents/Projects/budget-app/functions/api/register.js"
import { onRequest as ___middleware_js_onRequest } from "/Users/jeremiah/Documents/Projects/budget-app/functions/_middleware.js"

export const routes = [
    {
      routePath: "/api/extra-spends/:id",
      mountPath: "/api/extra-spends",
      method: "DELETE",
      middlewares: [],
      modules: [__api_extra_spends__id__js_onRequestDelete],
    },
  {
      routePath: "/api/monthly-expenses/:id",
      mountPath: "/api/monthly-expenses",
      method: "DELETE",
      middlewares: [],
      modules: [__api_monthly_expenses__id__js_onRequestDelete],
    },
  {
      routePath: "/api/earnings",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_earnings_js_onRequestGet],
    },
  {
      routePath: "/api/earnings",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_earnings_js_onRequestPut],
    },
  {
      routePath: "/api/extra-spends",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_extra_spends_js_onRequestGet],
    },
  {
      routePath: "/api/extra-spends",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_extra_spends_js_onRequestPost],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_login_js_onRequestPost],
    },
  {
      routePath: "/api/logout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_logout_js_onRequestPost],
    },
  {
      routePath: "/api/monthly-expenses",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_monthly_expenses_js_onRequestGet],
    },
  {
      routePath: "/api/monthly-expenses",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_monthly_expenses_js_onRequestPost],
    },
  {
      routePath: "/api/register",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_register_js_onRequestPost],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]