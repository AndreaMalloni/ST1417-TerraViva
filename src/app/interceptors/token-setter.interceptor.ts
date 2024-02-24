import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment.development";

export const tokenSetterInterceptor: HttpInterceptorFn = (req, next) => {
  let tokenNotNeeded: Map<String, String> = new Map<String, String>([
    [environment.baseURL + "/api/login", "POST"],
    [environment.baseURL + "/api/register", "POST"],
    [environment.baseURL + "/api/POI", "GET"]
  ])

  for (const [url, method] of tokenNotNeeded.entries()) {
    if(req.url == url && req.method == method) {
      return next(req);
    }
  }

  req = req.clone({ setHeaders: {'Authorization': `Bearer ${sessionStorage.getItem("token")}`} })
  return next(req);
};
