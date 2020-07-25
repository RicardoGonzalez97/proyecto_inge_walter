/**
 * Created by  on 4/23/16.
 */
'use strict';
app.factory("Article", function ($resource) {
    return $resource(API_SERVER + "Article/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});

app.factory("Comments", function ($resource) {
    return $resource(API_SERVER + "Comments/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});

app.factory("UserToken", function ($resource) {
    return $resource(SERVER + "auth/getUserbyToken/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory('RecoveryConstancia', function($resource){
    return $resource(SERVER + "auth/recoveryConstancia/:id", {id: "@_id"},{
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("RecoveryPassword", function ($resource) {
    return $resource(SERVER + "auth/recoveryPassword/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("RestorePassword", function ($resource) {
    return $resource(SERVER + "auth/restorePassword/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("logout", function ($resource) {
    return $resource(API_SERVER + "auth/logout/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Profile", function ($resource) {
    return $resource(API_SERVER + "auth/profile/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});

app.factory("Sessions", function ($resource) {
    return $resource(API_SERVER + "auth/sessions/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("EvaluatorArticle", function ($resource) {
    return $resource(API_SERVER + "EvaluatorArticle/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});

app.factory("Users", function ($resource) {
    return $resource(API_SERVER + "Users/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});

app.factory("CategoryCourse", function ($resource) {
    return $resource(API_SERVER + "CategoryCourse/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("City", function ($resource) {
    return $resource(API_SERVER + "City/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Convened", function ($resource) {
    return $resource(API_SERVER + "Convened/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Course", function ($resource) {
    return $resource(API_SERVER + "Course/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Evaluators", function ($resource) {
    return $resource(API_SERVER + "Evaluators/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("EvaluatorArticle", function ($resource) {
    return $resource(API_SERVER + "EvaluatorArticle/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("LinesofInvestigation", function ($resource) {
    return $resource(API_SERVER + "LinesofInvestigation/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Reviews", function ($resource) {
    return $resource(API_SERVER + "Reviews/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("State", function ($resource) {
    return $resource(API_SERVER + "State/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Students", function ($resource) {
    return $resource(API_SERVER + "Students/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("StudentsActivate", function ($resource) {
    return $resource(API_SERVER + "StudentsActivate/:id", {id: "@_id"}, {
        update: {method: "POST", params: {id: "@_id"}},
    });
});

app.factory("TypeCourse", function ($resource) {
    return $resource(API_SERVER + "TypeCourse/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("NotariaActivate", function ($resource) {
    return $resource(API_SERVER + "Notaria/:id", {id: "@_id"}, {
        update: {method: "GET", params: {id: "@_id"}},
    });
});
app.factory("Title", function ($resource) {
    return $resource(API_SERVER + "Title/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Certification", function ($resource) {
    return $resource(API_SERVER + "Certification/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Award", function ($resource) {
    return $resource(API_SERVER + "Award/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("CourseAdmin", function ($resource) {
    return $resource(API_SERVER + "curse/admin/CourseAdmin/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("TypeCourseAdmin", function ($resource) {
    return $resource(API_SERVER + "curse/admin/TypeCourseAdmin/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("CategoryCourseAdmin", function ($resource) {
    return $resource(API_SERVER + "curse/admin/CategoryCourseAdmin/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("Lista",function($resource){
    return $resource(API_SERVER + "curse/admin/CourseAdmin/:id",{id: "@_id"},{
       update: {method: "PUT", params: {id: "@_id"}}, 
    });
});
app.factory("StudensForCourse", function ($resource) {
    return $resource(API_SERVER + "curse/admin/StudensForCourse/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});
app.factory("StudensForUser", function ($resource) {
    return $resource(API_SERVER + "use/admin/StudensForUser/:id", {id: "@_id"}, {
        update: {method: "PUT", params: {id: "@_id"}},
    });
});