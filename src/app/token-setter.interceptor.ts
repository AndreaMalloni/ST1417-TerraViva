import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../environments/environment.development";

export const tokenSetterInterceptor: HttpInterceptorFn = (req, next) => {
  if((req.url != environment.baseURL + "/api/login") &&
    req.url != environment.baseURL + "/api/register") {
    req = req.clone({ setHeaders: {'Authorization': `Bearer ${sessionStorage.getItem("token")}`} })
    console.log(req.headers.get("Authorization"));
  }

  return next(req);
};
