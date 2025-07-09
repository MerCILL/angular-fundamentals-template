import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';

export const routes: Routes = [
  {
    path: 'login',
    component: CoursesComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'registration',
    component: CoursesComponent, // Временная заглушка
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'courses/add',
    component: CoursesComponent, // TODO: AddCourseComponent
    canActivate: [AuthorizedGuard, AdminGuard]
  },
  {
    path: 'courses/edit/:id',
    component: CoursesComponent, // TODO: EditCourseComponent
    canActivate: [AuthorizedGuard, AdminGuard]
  },
  {
    path: 'courses/:id',
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/courses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }