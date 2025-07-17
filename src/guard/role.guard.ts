import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";
@Injectable()
export class RoleGuard implements CanActivate{
      constructor(private reflector: Reflector) {}
    
    
        async canActivate(context: ExecutionContext): Promise<boolean>  {
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!requiredRoles) {
        return true;
        }
        
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((rol) => user.role?.includes(rol));

    }
   
}