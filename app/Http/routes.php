<?php


Route::group(['middleware' => 'web'], function () {
    Route::get('/', function () {
        return view('app');
    });
    Route::get('app', function () {
        return view('app-angular');
    });

    Route::get('auth/register', 'Auth_AuthController@getRegister');
    Route::post('auth/register', 'Auth_AuthController@postRegister');
    Route::get('auth/login', 'Auth_AuthController@getLogin');
    Route::post('auth/login', 'Auth_AuthController@postLogin');

    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/signup', 'AuthController@signup');
    Route::post('auth/logout', 'AuthController@logout');
    Route::post('auth/recoveryPassword', 'AuthController@recoveryPassword');
    Route::post('auth/recoveryConstancia','AuthController@recoveryConstancia');
    Route::post('auth/restorePassword', 'AuthController@restorePassword');
    Route::post('auth/getUserbyToken', 'AuthController@getUserbyToken');

    /**
     *
     * $request->session()->flush();
     * Autentificaci�n redes sociales
     *
     */
    Route::post('auth/twitter', 'AuthController@twitter');
    Route::post('auth/facebook', 'AuthController@facebook');
    Route::post('auth/foursquare', 'AuthController@foursquare');
    Route::post('auth/instagram', 'AuthController@instagram');
    Route::post('auth/github', 'AuthController@github');
    Route::post('auth/google', 'AuthController@google');
    Route::post('auth/linkedin', 'AuthController@linkedin');
    Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);
});
/**
 * Definici�n de rutas de la aplicaci�n  que sera consumida por angular
 * API V1
 * 24-Abril-2016
 * Manuel
 */
Route::group(['prefix' => 'v1', 'middleware' => 'web'], function () {
    Route::get('auth/register', 'Auth_AuthController@getRegister');
    Route::post('auth/register', 'Auth_AuthController@postRegister');
    Route::get('auth/login', 'Auth_AuthController@getLogin');
    Route::post('auth/login', 'Auth_AuthController@postLogin');

    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/signup', 'AuthController@signup');
    Route::post('auth/logout', 'AuthController@logout');
    Route::post('auth/sessions', 'AuthController@sessions');
    Route::get('auth/profile', 'AuthController@profile');

});
//Route::get('process', function () {
//    $users = \App\User::where('id', '>', 28)->get();
//    foreach ($users as $user) {
//        $student = new \App\Models\v1\Students();
//        $student->user_id = $user->id;
//        $student->course_id = 22;
//        $student->status = 0;
//        $student->certificate = 0;
//        $student->save();
//    }
//});
Route::group(['prefix' => 'v1', 'middleware' => 'web', 'namespace' => 'v1'], function () {
    Route::get('auth/register', 'Auth_AuthController@getRegister');
    Route::post('auth/register', 'Auth_AuthController@postRegister');
    Route::get('auth/login', 'Auth_AuthController@getLogin');
    Route::post('auth/login', 'Auth_AuthController@postLogin');

    Route::resource('Article', 'ArticleController');
    Route::resource('PaidCompropago', 'PaidCompropago');

    Route::resource('CategoryCourse', 'categoryCourseController');
    Route::resource('City', 'CityController');
    Route::resource('Convened', 'ConvenedController');
    Route::resource('Evaluators', 'EvaluatorsController');
    Route::resource('LinesofInvestigation', 'linesofInvestigationController');

    Route::resource('Reviews', 'ReviewsController');
    Route::resource('Students', 'StudentsController');
    Route::resource('Course', 'CourseController');
    Route::resource('Notaria', 'NotariaController');

    Route::resource('Award', 'AwardController');
    Route::resource('Certification', 'CertificationController');
    Route::resource('Title', 'TitleController');

    Route::get('Course/getConstancia/{id}', 'CourseController@getConstancia');
    Route::get('Article/getConstancia/{id}', 'ArticleController@getConstancia');
    Route::post("CourseFiles/{id}", 'CourseController@CourseFiles');
    Route::post("CourseImages/{id}", 'CourseController@CourseImages');
    Route::post("ConvenedFiles/{id}", 'ConvenedController@ConvenedFiles');
    Route::post("ConvenedImages/{id}", 'ConvenedController@ConvenedImages');
    Route::post("ArticleFiles/{id}", 'ArticleController@ArticleFiles');
    Route::resource('Comments', 'CommentCourseController');

    Route::resource('State', 'StateController');

    Route::resource('TypeCourse', 'TypeCourseController');
});

Route::group(['prefix' => 'v1/curse/admin', 'middleware' => 'web', 'namespace' => 'v1\Admin\CourseAdmin'], function () {
    Route::get('auth/register', 'Auth_AuthController@getRegister');
    Route::post('auth/register', 'Auth_AuthController@postRegister');
    Route::get('auth/login', 'Auth_AuthController@getLogin');
    Route::post('auth/login', 'Auth_AuthController@postLogin');

    Route::resource('CategoryCourseAdmin', 'CategoryCourseAdminController');
    Route::resource('StudensForCourse', 'StudensForCourseController');


    Route::get('NotariaActivate', 'NotariaController@active');
    Route::post('StudentsActivate','StudentsForCourseController@active');

    Route::resource('CourseAdmin', 'CourseAdminController');
    Route::resource('TypeCourseAdmin', 'TypeCourseAdminController');

    Route::get('Course/getConstancia/{id}', 'CourseAdminController@getConstancia');
    Route::post("CourseFiles/{id}", 'CourseAdminController@CourseFiles');
    Route::post("CourseImages/{id}", 'CourseAdminController@CourseImages');

});
Route::resource('Pasedelista/students','PasedelistaController');
Route::resource('Pasedelista2/students','Pasedelista2Controller');
Route::resource('Pasedelista3/students','Pasedelista3Controller');