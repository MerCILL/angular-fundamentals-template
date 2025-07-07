import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FontAwesomeModule }      from '@fortawesome/angular-fontawesome';
import { SharedModule }           from '@shared/shared.module';
import { AppComponent }           from '@app/app.component';
import { CourseInfoComponent }    from '@features/course-info/course-info.component';
import { CoursesComponent }       from '@features/courses/courses.component';
import { CoursesListComponent }   from '@features/courses-list/courses-list.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { CoursesService } from './services/courses.service';
import { CoursesStoreService } from './services/courses-store.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
    CoursesComponent,
    CoursesListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}