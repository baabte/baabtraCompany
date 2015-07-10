(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the pages router
     */
     angular.module('baabtra')
      .config(
        ['$stateProvider', '$urlRouterProvider',
          function ( $stateProvider,   $urlRouterProvider ) {
            $stateProvider
              .state('page', {
                url: '/page',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  '': {
                    templateUrl: 'views/layout.html'
                  },
                  // This shows off how you could populate *any* view within *any* ancestor state.
                  // Oopulating the ui-view="aside@"
                  'aside': {
                    templateUrl: 'views/partials/aside.nav.pages.html'
                  }
                }
              })
              .state('home', {
                url: '/home',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  '': {
                    templateUrl: 'views/layout.html'
                  },
                  // This shows off how you could populate *any* view within *any* ancestor state.
                  // Oopulating the ui-view="aside@"
                  'aside': {
                    templateUrl: 'views/partials/aside.nav.pages.html'
                  }
                }
              })
              .state('home.main.company', {
                url: '/company',
                views:{
                  'innercontent':{
                templateUrl: 'angularModules/company/partials/Partial-company_view.html',
                controller:'CompanyViewCtrl'
                                  }
                      }
                
              })

              .state('home.main.company.registration', {
                url: '/registration',
                views:{
                  'manage': {
                templateUrl: 'angularModules/company/partials/Partial-company_registration.html',
                controller: 'CompanyRegistrationCtrl'
                            }
                      }
              })
              .state('home.main.company.manage', {
                url: '/manage',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage.html'
                  }
                 
                }
              }) 
              .state('home.main.company.manage.info', {
                url: '/company-info/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/company/partials/Partial-company_manage_info.html'
                  } 
                }
              })
              .state('home.main.company.manage.billing-config', {
                url: '/company-billing-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/billing/partials/Partial-user_billing_config.html',
                    controller:'UserBillingConfigCtrl'
                  } 
                }
              })
              .state('home.main.company.manage.feature-config', {
                url: '/company-feature-config/:companyId',
                views: {
                  // So this one is targeting the unnamed view within the parent state's template.
                  'manage-container': {
                    templateUrl: 'angularModules/feature/partials/Partial-user_feature_config.html',
                    controller:'UserFeatureConfigCtrl'
                  } 
                }
              })
              .state('page.profile', {
                url: '/profile',
                templateUrl: 'views/pages/profile.html'
              })
              .state('page.settings', {
                url: '/settings',
                templateUrl: 'views/pages/settings.html'
              })
              .state('page.blank', {
                url: '/blank',
                templateUrl: 'views/pages/blank.html'

              })
		          .state('login', {
                url: '/login',
                templateUrl: 'angularModules/login/partials/Partial-Login_view.html',
                controller:'LoginViewCtrl'
              })
              .state('home.main', {
                url: '/main',
                templateUrl: 'angularModules/login/partials/Partial-home.html',
                controller:'HomeCtrl'
              })
              .state('home.main.newParent', {
                url: '/newParent',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/manageParent/newParent/partials/Partial-registerParent.html',
                    controller:'RegisterparentCtrl'
                  }
                }
              })
              .state('home.main.addCandidate', {
                url: '/addCandidate',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/manageParent/addCandidate/partials/Partial-addCandidateUnderParent.html',
                    controller:'AddcandidateunderparentCtrl'
                  }
                }
              })
              .state('home.main.viewRelatedCandidates', {
                url: '/viewRelatedCandidates',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/parent/viewCandidates/partials/Partial-viewCandidatesForParent.html',
                    controller:'ViewcandidatesforparentCtrl'
                  }
                }
              })
              .state('home.main.company.manage.role', {
                url: '/role',
                templateUrl: 'angularModules/company/partials/Partial-manage_user_role.html',
                controller:'ManageUserRoleCtrl'
              })
              .state('home.main.featureConfig', {
                url: '/featureConfig',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/feature/partials/Partial-feature_config.html',
                controller:'FeatureConfigCtrl'
                   }
                }
              })
              .state('home.main.billingPlans', {
                url: '/billingPlans',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/billing/partials/Partial-billing_plans.html',
                controller:'BillingPlansCtrl'
                   }
                }
              })
              .state('home.main.department', {
                url: '/department/:branchId',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/Department/partials/Partial-department.html',
                controller:'DepartmentCtrl'
                   }
                }
              })
              .state('home.main.roleMenuMapping', {
                url: '/roleMenuMapping',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/roleMenuMapping/partials/Partial-roleMenuMapping.html',
                    controller:'RoleMenuMappingCtrl'
                  }
              }
              })
              .state('home.main.manageCompany', {
                url: '/manageCompany',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-manageCompany.html',
                    controller:'ManagecompanyCtrl'
                  }
              }
              })
              .state('home.main.manageCompany.company', {
                url: '/cmp_id={companyId}',
                views:{
                  'companycontent':{
                    templateUrl: 'angularModules/company/partials/Partial-companyHome.html',
                    controller:'CompanyhomeCtrl'
                  }
              }
              })
              .state('home.main.Branches', {
                url: '/Branches',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Branches/partials/Partial-Branches.html',
                    controller:'BranchesCtrl'
                   }                  
                  }
              })
               .state('home.main.userMenuMapping', {
                url: '/userMenuMapping',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-userMenuMapping.html',
                    controller: 'UsermenumappingCtrl'
                  }
                }
                
              })
               .state('home.main.registerReseller', {
                url: '/registerReseller',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Reseller/partials/Partial-reseller.html',
                    controller: 'ResellerCtrl'
                  }
                }
                
              })

               .state('home.main.addCourseElement', {
                url: '/courseElement',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourseElement.html',
                    controller: 'AddcourseelementCtrl'
                  }
                }
                
              })
               .state('home.main.addCourseDomain', {
                url: '/addCourseDomain',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourseDomain.html',
                    controller: 'AddcoursedomainCtrl'
                  }
                }
              })
                .state('home.main.addExitCriteria', {
                url: '/exitCriteria',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addExitCriteria.html',
                    controller: 'AddexitcriteriaCtrl'
                  }
                }
                
              })

              .state('home.main.addMenu', {
                url: '/addMenu',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/company/partials/Partial-addMenu.html',
                    controller: 'AddmenuCtrl'
                  }
                }
                
              })
              .state('home.main.addCourse', {
                url: '/addCourse',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-addCourse.html',
                    controller: 'AddcourseCtrl'
                  }
                }
                
              })

              .state('home.main.draftedCourses', {
                url: '/draftedCourses',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-draftedCourses.html',
                    controller: 'DraftedcoursesCtrl'
                  }
                }
                
              })

              .state('home.main.course', {
                url: '/course/:courseId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-courseDetails.html',
                    controller:'CoursedetailsCtrl'
                  }
                }
                
              })

              .state('home.main.addCourse.step1', {
                url: '/step1/:key/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep1.html'
                  }
                }
                
              })

              .state('home.main.addCourse.step2', {
                url: '/step2/:key/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep2.html'
                  }
                }
                
              })
              .state('home.main.addCourse.step3', {
                url: '/step3/:key/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep3.html'
                  }
                }
                
              })
              .state('home.main.addCourse.step4', {
                url: '/step4/:key/:courseId',
                views:{
                  'addCourse-container':{
                    templateUrl: 'angularModules/course/partials/addCourseStep4.html'
                  }
                }
                
              })
              .state('home.main.configMarkSheet', {
                url: '/configMarkSheet',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/markSheet/designMarkSheet/partials/Partial-designMarkSheet.html',
                    controller:'DesignmarksheetCtrl'
                  }
                }
                
              })
              .state('home.main.userRegistration', {
                url: '/userRegistration/:key',

                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-userRegistration.html',
                    controller: 'UserregistrationCtrl',              
                  }
                }
                
              })
              
               .state('home.main.userRegistration.step5', {
                url: '/step5',
                views:{
                  'userRegistration-container':{
                    templateUrl: 'angularModules/user/partials/step5_payment.html'
                  }
                }
              })

               .state('home.main.formCustomizer', {
                url: '/formCustomizer',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/form/partials/Partial-formCustomizer.html',
                     controller: 'FormcustomizerCtrl'
                  }
                }
              })

               .state('home.main.formCustomizer.SelectForm', {
                url: '/SelectForm',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/selectForm.html'
                  }
                }
              })
               .state('home.main.formCustomizer.SelectStep', {
                url: '/SelectStep',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/selectStep.html'
                  }
                }
              })
               .state('home.main.formCustomizer.customizeForm', {
                url: '/customizeForm',
                views:{
                  'formCustom-container':{
                    templateUrl: 'angularModules/form/partials/customizeForm.html'
                  }
                }
              })
                         

              .state('userRegistration', {
                url: '/userRegistration',
                
                    templateUrl: 'angularModules/user/partials/Partial-userRegistration.html',
                     controller: 'UserregistrationCtrl'

              })
              .state('home.main.JobPosting', {
                url: '/JobPosting',
                views:{
                  'innercontent':{
                      templateUrl: 'angularModules/company/partials/Partial-JobPosting.html',
                      controller: 'JobpostingCtrl'
                  }
                }
              })
                .state('home.main.ViewJobs', {
                url: '/ViewJobs',
                  views:{
                  'innercontent':{
                templateUrl: 'angularModules/company/partials/Partial-ListJobs.html',
                controller: 'ListjobsCtrl'
                  }
                }
              })
                .state('home.main.PublishedCourse', {
                url: '/PublishedCourse/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-PublishedCourse.html',
                    controller: 'PublishedcourseCtrl'
                  }
                }
                
              })

                .state('home.main.viewOrderForm', {
                url: '/viewOrderForm/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-viewUsersForApprove.html',
                    controller: 'ViewusersforapproveCtrl'
                  }
                }
              })

                .state('home.main.allocateCandidateToBatch', {
                url: '/allocateCandidateToBatch/:courseId/:batchId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/allocateCandidateToBatch/partials/Partial-allocateCandidateToBatch.html',
                    controller: 'AllocatecandidatetobatchCtrl'
                  }
                }
              })

                .state('home.main.viewOrderFormByCourse', {
                url: '/viewOrderFormByCourse/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Nomination/partials/Partial-verifyOrderformByCourse.html',
                    controller: 'VerifyorderformbycourseCtrl'
                  }
                }
              })


                .state('home.main.viewOrderForm.approveOrderFrom', {
                url: '/approveOrderFrom/:ofId',
                views:{
                  'orderFrom-content':{
                    templateUrl: 'angularModules/Nomination/partials/Partial-approveOrderFrom.html'
                  }
                }
              })



              .state('home.main.viewCourse', {
                url: '/viewCourse/:courseId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-viewCourse.html',
                    controller: 'ViewcourseCtrl'
                  }
                }
                
              })
              .state('home.main.CandidateCourseView', {
                url: '/CandidateCourseView',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-candidateCourseView.html',
                    controller: 'CandidatecourseviewCtrl'
                  }
                }
                
              })
              .state('home.main.CandidateCourseDetails', {
                url: '/CandidateCourseDetails/:courseId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-candidateCourseDetail.html',
                    controller: 'CandidatecoursedetailCtrl'
                  }
                } 
                
              })
              .state('home.main.userProfile', {
                url: '/userProfile/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/profile/partials/Partial-userProfile.html',
                    controller: 'UserprofileCtrl'
                  }
                }
                
              })
              .state('home.main.baabtraProfile', {
                url: '/baabtraProfile/:type/:userLoginId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/baabtra.comProfile/partials/Partial-baabtra.comProfile.html',
                    controller: 'BaabtraComprofileCtrl'
                  }
                }
                
              }) 
               .state('home.main.globalSettings', {
                url: '/globalSettings',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/globalSettings/partials/Partial-globalSettings.html',
                    controller: 'GlobalsettingsCtrl'
                  }
                }
                
              })
               .state('home.main.themeConfiguration', {
                url: '/themeConfiguration',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/themeConfiguration/partials/Partial-themeConfiguration.html',
                    controller: 'ThemeconfigurationCtrl'
                  }
                }
                
              })
              .state('home.main.test', {
                url: '/test',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/test/partials/Partial-test.html',
                    controller: 'TestCtrl'
                  }
                }
              })
              .state('home.main.evaluation', {
                url: '/evaluation',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/evaluation/partials/Partial-evaluationViewer.html',
                    controller: 'EvaluationviewerCtrl'
                  }
                }
              })
              .state('home.main.courseElementFieldsManaging', {
                url: '/courseElementFieldsManaging',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/courseElementFieldsManaging/partials/Partial-courseElementFieldsManaging.html',
                    controller: 'CourseelementfieldsmanagingCtrl'
                  }
                }
                
              })
              .state('home.main.Createfeedback', {
                url: '/Createfeedback',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/feedback/partials/Partial-createFeedBack.html',
                    controller: 'CreatefeedbackCtrl'
                  }
                }
                
              })

              .state('home.main.viewDetails', {
                url: '/viewFeedbackDetails/:feedBackId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/feedback/partials/Partial-feedbackDetails.html',
                    controller: 'FeedbackdetailsCtrl'
                  }
                }
              })

              .state('home.main.viewFeedbackRequest', {
                url: '/viewFeedbackRequest',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/feedback/partials/Partial-viewFeedback.html',
                    controller: 'ViewfeedbackCtrl'
                  }
                }
              })

              .state('home.main.userReport', {
                url: '/userReport',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-userReport.html',
                    controller: 'UserreportCtrl'
                  }
                }
                
              })

              .state('home.main.notificationConfiguration', {
                url: '/notificationConfiguration',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Notification/notificationConfiguration/partials/Partial-notificationConfiguration.html',
                    controller: 'NotificationconfigurationCtrl'
                  }
                }
                
              })

               .state('home.main.candidateRegistrationReport', {
                url: '/candidateRegistrationReport',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-candidateRegistrationReport.html',
                    controller: 'CandidateregistrationreportCtrl'
                  }
                }
                
              })
             .state('home.main.feedbackReport', {
                url: '/feedbackReport/:feedbackId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-feedbackReport.html',
                    controller: 'FeedbackreportCtrl'
                  }
                }
                
              })
             .state('home.main.feedbackList', {
                url: '/feedbackList',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-feedbackReportList.html',
                    controller: 'FeedbackreportlistCtrl'
                  }
                }
                
              })
                 .state('home.main.viewUsers', {
                url: '/viewUsers',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-viewUsers.html',
                    controller: 'ViewusersCtrl'
                  }
                }
                
              })
                  .state('home.main.user', {
                url: '/user',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/manageUsers/partials/Partial-manageUsers.html',
                    controller: 'ManageusersCtrl'
                  }
                }
                
              })
              .state('home.main.bulkEnrollment', {
                url: '/bulkEnrollment',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user//partials/Partial-bulkEnrollment.html',
                    controller: 'BulkenrollmentCtrl'
                  }
                }
                
              })
              .state('home.main.nominateEmployee', {
                url: '/nominateEmployee/:key/:ofId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Nomination/partials/Partial-nomination.html',
                    controller: 'NominationCtrl'
                  }
                }
                
              })
              .state('home.main.viewMyCourse', {
                url: '/viewMyCourse/:courseMappingId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/candidateCourseRelated/candidateCourseView/partials/Partial-candidateCourseView.html',
                    controller: 'viewCandidateCourseCtrl'
                  }
                }
              })
               .state('home.main.batches', {
                url: '/manageBatches/:courseId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-manageBatches.html',
                    controller:'ManagebatchesCtrl'
                  }
                }
                
              })
               .state('home.main.viewBatches', {
                url: '/viewBatches/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-viewBatches.html',
                    controller:'ViewbatchesCtrl'
                  }
                }
                
              })
              .state('home.main.assignCourseMaterial', {
                url: '/assignCourseMaterial/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/course/partials/Partial-assignCourseMaterial.html',
                    controller:'AssigncoursematerialCtrl'
                  }
                }
                
              })
              .state('home.main.batchAssignment', {
                url: '/batchAssignment/:batchMappingId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-batchAssignment.html',
                    controller:'BatchassignmentCtrl'
                    }
                }
                
              })
              .state('home.main.emailSms', {
                url: '/emailSms',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/emailSmsConfig/partials/Partial-emailSmsConfig.html',
                    controller:'EmailsmsconfigCtrl'
                  }
                }
                
              })
              .state('home.main.batchAttendance', {
                url: '/batchAttendance/:batchMappingId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-batchAttendance.html',
                    controller:'BatchattendanceCtrl'
                  }
                }
                
              })
              .state('home.main.menteeAttendance', {
                url: '/menteeAttendance/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-menteeAttendance.html',
                    controller:'MenteeattendanceCtrl'
                  }
                }
                
              })
              .state('home.main.menteeEvaluation', {
                url: '/menteeEvaluation/:courseId/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-menteeEvaluation.html',
                    controller:'MenteeevaluationCtrl'
                  }
                }
                
              })
              .state('home.main.batchEvaluation', {
                url: '/batchEvaluation/:batchMappingId/:courseId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-batchEvaluation.html',
                    controller:'BatchevaluationCtrl'
                  }
                }
                
              })
              .state('home.main.menteeAttendanceReport', {
                url: '/menteeAttendanceReport/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-menteeAttendanceReport.html',
                    controller:'MenteeattendancereportCtrl'
                  }
                }
              })
              .state('home.main.allocateCandidate', {
                url: '/allocateCandidate',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-allocateCandidate.html',
                    controller:'AllocatecandidateCtrl'
                  }
                }
                
              })
              .state('home.main.courseAllocate', {
                url: '/courseAllocate',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-courseAllocate.html',
                    controller:'CourseallocateCtrl'
                  }
                }
                
              })

              .state('home.main.viewMarkSheet', {
                url: '/viewMarkSheet/:courseId/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/markSheet/viewMarkSheet/partials/Partial-viewMarkSheet.html',
                    controller:'ViewmarksheetCtrl'
                  }
                }
              })

                .state('home.main.viewCertificate', {
                url: '/viewCertificate/:courseId/:userId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Certificate/viewCertificate/partials/Partial-viewCertificate.html',
                    controller:'ViewcertificateCtrl'
                  }
                }
              })
              
              .state('home.main.batchWithOption', {
                url: '/manageBatch/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-viewBatchWithOption.html',
                    controller:'ViewbatchwithoptionCtrl'
                  }
                }
              })

              .state('home.main.traineesWithOption', {
                url: '/manageTrainees/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/user/partials/Partial-ManageTrainees.html',
                    controller:'ManagetraineesCtrl'
                  }
                }
              })

              .state('home.main.markBatchAttendance', {
                url: '/markBatchAttendance/:batchMappingId/:mode',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-markBatchAttendance.html',
                    controller:'MarkbatchattendanceCtrl'
                  }
                }
              })
              .state('home.main.viewPaymentReport', {
                url: '/viewPaymentReport/:key',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Nomination/partials/Partial-viewPaymentReport.html',
                    controller:'ViewpaymentreportCtrl'
                  }
                }
              })
              .state('home.main.allocateEvaluator', {
                url: '/allocateEvaluator/:batchMappingId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Batches/partials/Partial-allocateEvaluator.html',
                    controller:'AllocateevaluatorCtrl'
                  }
                }
              })

              .state('home.main.ILTAdmin', {
                url: '/ILTAdmin',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/ILT/partials/Partial-ILTAdmin.html',
                    controller:'IltadminCtrl'
                  }
                }
              })

              .state('home.main.ILTCantidate', {
                url: '/ILTCantidate',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/ILT/partials/Partial-ILTCandidate.html',
                    controller:'IltcandidateCtrl'
                  }
                }
              })

               .state('home.main.viewResults', {
                url: '/viewResults/:batchMappingId',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/Result/partials/Partial-viewResult.html',
                    controller: 'ViewresultCtrl'
                  }
                }
                
              })
               .state('home.main.batchAttendanceReport', {
                url: '/batchAttendanceReport',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/reports/partials/Partial-batchAttendanceReport.html',
                    controller: 'BatchattendancereportCtrl'
                  }
                }
                
              })
               .state('home.main.questionBank', {
                url: '/questionBank',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/questionBank/partials/Partial-questionBankView.html',
                    controller: 'QuestionbankviewCtrl'
                  }
                }
                
              })
               .state('home.main.createForm', {
                url: '/createForm',
                views:{
                  'innercontent':{
                    templateUrl: 'angularModules/common/formCreator/partials/Partial-formCreator.html',
                    controller: 'FormcreatorCtrl'
                  }
                }
                
              })
               .state('course', {
                url: '/course/:companyId',
                templateUrl: 'angularModules/publicAPIs/course/partials/Partial-companyCourseList.html',
                controller:'CompanycourselistCtrl'
              })
               .state('courseUserRegistration', {
                url: '/courseUserRegistration/:courseId',
                templateUrl: 'angularModules/common/formLoader/partials/Partial-formLoader.html',
                controller:'FormloaderCtrl'
              })

                .state('home.main.paymentRefund', {
                url: '/paymentRefund/:key',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/payment/paymentRefund/partials/Partial-paymentRefund.html',
                controller:'PaymentrefundCtrl'
                  }
                }
              })

                .state('home.main.refundRequest', {
                url: '/refundRequest/:ofId',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/payment/refundRequest/partials/Partial-refundRequest.html',
                controller:'RefundrequestCtrl'
                  }
                }
              })

                 .state('home.main.manageOrderForms', {
                url: '/manageOrderForms/',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/orderForm/manageOrderForms/partials/Partial-manageOrderForms.html',
                controller:'ManageorderformsCtrl'
                  }
                }
              })
                 .state('home.main.resultReport', {
                url: '/resultReport/',
                 views:{
                  'innercontent':{
                templateUrl: 'angularModules/result/resultReport/partials/Partial-resultReport.html',
                controller:'ResultreportCtrl'
                  }
                }
              })

              .state('page.document', {
                url: '/document',
                templateUrl: 'views/pages/document.html'
              })
              .state('signin', {
                url: '/signin',
                templateUrl: 'views/pages/signin.html'
              })
              .state('signup', {
                url: '/signup',
                templateUrl: 'angularModules/signUp/partials/Partial-signUp.html',
                controller: 'SignupCtrl'

              })
              .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: 'views/pages/forgot-password.html'
              })
              .state('lockme', {
                url: '/lockme',
                templateUrl: 'views/pages/lockme.html'
              })
              .state('404', {
                url: '/404',
                templateUrl: 'views/pages/404.html'
              })
              .state('505', {
                url: '/505',
                templateUrl: 'views/pages/505.html'
              });



          }
        ]
      );
}());
