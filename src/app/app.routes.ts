import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { UniversityComponent } from './pages/university/university.component';
import { AdminDsbComponent } from './pages/admin-dsb/admin-dsb.component';
import { ExchangeStudentComponent } from './pages/exchange-student/exchange-student.component';
import { EnrolledStudentComponent } from './pages/enrolled-student/enrolled-student.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { ProspectiveStudentComponent } from './pages/prospective-student/prospective-student.component';
import { SearchModulesComponent } from './pages/search-modules/search-modules.component';
import { AuthGuard } from './services/auth.guard';
import { ExamOfficerComponent } from './pages/exam-officer/exam-officer.component';
import { ProfessorsComponent } from './pages/professors/professors.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarInComponent } from './pages/navbar-in/navbar-in.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ShowCourseComponent } from './pages/show-course/show-course.component';
import { AddModuleComponent } from './pages/add-module/add-module.component';
import { ShowModulesComponent } from './pages/show-modules/show-modules.component';
import { ProfileEnrolledComponent } from './pages/profile-enrolled/profile-enrolled.component';
import { ShowModulesEnrolledComponent } from './pages/show-modules-enrolled/show-modules-enrolled.component';
import { ModuleDetailsComponent } from './pages/module-details/module-details.component';
import { UpdateModuleComponent } from './pages/update-module/update-module.component';
import { ModulesListComponent } from './pages/modules-list/modules-list.component';
import { SimilarityDetailsComponent } from './pages/similarity-details/similarity-details.component';
import { UpdateCourseComponent } from './pages/update-course/update-course.component';
import { UserPermissionsComponent } from './pages/user-permissions/user-permissions.component';
import { EnrolledModulesComponent } from './pages/enrolled-modules/enrolled-modules.component';
import { TransferCreditComponent } from './pages/transfer-credit/transfer-credit.component';
import { RequestStatusComponent } from './pages/request-status/request-status.component';
import { AdminCreditTransferRequestComponent } from './pages/admin-credit-transfer-request/admin-credit-transfer-request.component';
import { ApprovedRequestsComponent } from './pages/approved-requests/approved-requests.component';
import { ApprovedRequestsEnComponent } from './pages/approved-requests-en/approved-requests-en.component';
import { TranscriptTemplateComponent } from './pages/transcript-template/transcript-template.component';
import { RejectedRequestsComponent } from './pages/rejected-requests/rejected-requests.component';

export const routes: Routes = [
    // Home Routes
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'home', component: HomeComponent },
    { path: 'university', component: UniversityComponent },

    // Admin Routes
    {
        path: 'admin-dsb',
        component: AdminDsbComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },
    {
        path: 'add-course',
        component: AddCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },
    {
        path: 'show-course',
        component: ShowCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },
    {
        path: 'add-module',
        component: AddModuleComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },
    {
        path: 'show-modules',
        component: ShowModulesComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: [6] },
    },

    // Enrolled Student Routes
    {
        path: 'enrolled-student',
        component: EnrolledStudentComponent,
        canActivate: [AuthGuard],
        data: { roles: [2] },
    },
    {
        path: 'profile-enrolled',
        component: ProfileEnrolledComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'show-modules-en',
        component: ShowModulesEnrolledComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'enrolled-modules',
        component: EnrolledModulesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'credit-transfer-form',
        component: TransferCreditComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'request-status',
        component: RequestStatusComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'credit-transfer-request-admin',
        component: AdminCreditTransferRequestComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'approved-requests',
        component: ApprovedRequestsComponent,
        canActivate: [AuthGuard],
    },
    { 
        path: 'rejected-requests', 
        component: RejectedRequestsComponent, 
        canActivate: [AuthGuard] },
    {
        path: 'approved-requests-en',
        component: ApprovedRequestsEnComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'prospective-student',
        component: ProspectiveStudentComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
    },
    {
        path: 'exchange-student',
        component: ExchangeStudentComponent,
        canActivate: [AuthGuard],
        data: { roles: [3] },
    },
    {
        path: 'exam-officer',
        component: ExamOfficerComponent,
        canActivate: [AuthGuard],
        data: { roles: [4] },
    },
    {
        path: 'professors',
        component: ProfessorsComponent,
        canActivate: [AuthGuard],
        data: { roles: [5] },
    },
    { path: 'transcript', component: TranscriptTemplateComponent },

    //Widely used components but currently not role specific
    {
        path: 'search-modules',
        component: SearchModulesComponent,
        canActivate: [AuthGuard],
    },

    //Navbar-in for after Login
    {
        path: 'navebar-in',
        component: NavbarInComponent,
        canActivate: [AuthGuard],
    },

    { path: 'compare', component: CompareComponent, canActivate: [AuthGuard] },
    {
        path: 'module-details/:id',
        component: ModuleDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'update-module/:modID',
        component: UpdateModuleComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'module-list',
        component: ModulesListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'similarity-details',
        component: SimilarityDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'update-course/:courseID',
        component: UpdateCourseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user-permissions',
        component: UserPermissionsComponent,
        canActivate: [AuthGuard],
    },
];
