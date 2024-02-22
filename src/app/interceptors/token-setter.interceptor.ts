import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment.development";

export const tokenSetterInterceptor: HttpInterceptorFn = (req, next) => {
  let tokenNotNeeded = [
    environment.baseURL + "/api/login",
    environment.baseURL + "/api/register",
    environment.baseURL + "/api/POI/getAllPOI"
  ]

  for (const url in tokenNotNeeded) {
    if(req.url == url) {
      return next(req);
    }
  }

  req = req.clone({ setHeaders: {'Authorization': `Bearer ${sessionStorage.getItem("token")}`} })
  console.log(req.headers.get("Authorization"));
  return next(req);
};
