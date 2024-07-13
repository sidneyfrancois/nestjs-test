import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '@src/decorators/role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(allRoles: string[], userRoles: string): boolean {
    return allRoles.some((role) => userRoles.includes(role)) ? true : false
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())

    if (!roles) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.roles)
  }
}
