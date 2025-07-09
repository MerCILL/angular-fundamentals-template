import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { CoursesComponent } from '@features/courses/courses.component';
import { CoursesListComponent } from '@features/courses-list/courses-list.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { CoursesService } from './services/courses.service';
import { CoursesStoreService } from './services/courses-store.service';
import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { UserService } from './user/services/user.service';
import { UserStoreService } from './user/services/user-store.service';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientWrapper, HttpClientWrapperService } from './services/http-client-wrapper.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
    CoursesComponent,
    CoursesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    // Guards
    AuthorizedGuard,
    NotAuthorizedGuard,
    AdminGuard,
    
    // Services
    CoursesService,
    CoursesStoreService,
    AuthService,
    SessionStorageService,
    UserService,
    UserStoreService,
    
    // Window provider for SessionStorageService (only in browser environment)
    {
      provide: 'Window',
      useFactory: () => typeof window !== 'undefined' ? window : undefined
    },
    
    // API URL provider
    {
      provide: 'API_URL',
      useValue: 'http://localhost:4000/api'
    },
    
    // HTTP Client Wrapper
    {
      provide: HttpClientWrapper,
      useClass: HttpClientWrapperService
    },
    
    // HTTP Interceptor for token handling
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }