import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {map, Subject} from "rxjs";
import {UserContextService} from "../../../core/services/user-context.service";
import {Role} from "../model/roles.enum";
import {arraysEqual} from "../util/util.functions";

@Directive({
  selector: '[appRoleChecker]'
})
export class RoleCheckerDirective implements OnInit, OnDestroy {

  @Input()
  public appRoleChecker: Role | undefined;

  private ngDestroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private userContextService: UserContextService) {
  }


  ngOnInit() {
    this.userContextService.getUserContext()
      .pipe(
        takeUntil(this.ngDestroy$),
        map(userContext => userContext.roles),
        distinctUntilChanged((first, second) => arraysEqual(first, second)),
      )
      .subscribe((userRoles: Role[]) => {
        this.elementRef.nativeElement.disabled = true;
        this.viewContainer.clear();

        if (!this.appRoleChecker) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          const hasPermission = userRoles.includes(this.appRoleChecker);
          if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
