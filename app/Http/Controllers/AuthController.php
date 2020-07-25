<?php namespace App\Http\Controllers;

use Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use App\User;
use \Session;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class AuthController extends Controller
{
    use AuthenticableTrait;

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recoveryPassword(Request $request)
    {
        $user = User::where('email', $request->input('email', '@'))->first();
        $token = "";
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $user->token = str_random(255);
        $data['user'] = $user;
        $user->save();

        Mail::send("emails.recovery", $data, function ($message) use ($user) {
            $message->from(env("MAIL", 'manuel.toala@t4b.mx'), 'GICDT');
            $message->subject("Recuperación de Contraseña");
            $message->to($user->email);
        });
        return response()->json(['message' => 'Recuperación de contraseña enviada revisa tu correo.']);

    }

    /*enviar constancia a correo electronico
    public function recoveryConstancia(Request $request){
         $user = Auth::user();

        Mail::send('emails.constancia', ['user' => $user], function ($message) use ($user) {
            $message->from(env('MAIL','soporteiq16@gmail.com'), 'GICDT');
            $message->subject("Generador de Constancia");
            $message->to($user->email, $user->name);
        });
        return response()->json(['message' => 'Constancia enviada revisa tu correo']);
    }
*/
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function restorePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $user = User::where('token', $request->input('token', '@'))->first();

        if (!$user) {
            return response()->json(['errors' => ['usaurio'=>['Usuario no encontrado o el token no es correcto.']]], 422);
        }
        $user->password = Hash::make($request->input('password'));
        $user->token = null;
        $user->save();
        return response()->json(['message' => 'Cambio de contraseña satisfactorio.'], 200);


    }

    public function getUserbyToken(Request $request)
    {
        $user = User::selectRaw('concat(name," ",ap_pat," ",ap_mat) as nombre, id, email')->where('token', $request->input('token', '@'))->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado o el token no es correcto.'], 404);
        }
        return response()->json(['user' => $user]);

    }

    /**
     * Generate JSON Web Token.
     */
    protected function createToken($user)
    {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }


    /**
     * Unlink provider.
     */
    public function unlink(Request $request, $provider)
    {
        $user = User::find($request['user']['sub']);

        if (!$user) {
            return response()->json(['message' => 'User not found']);
        }

        $user->$provider = '';
        $user->save();

        return response()->json(array('token' => $this->createToken($user)));
    }

    /**
     * Log in with Email and Password.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flush();
        return response()->json(['msg' => "Vuelve pronto"], 200);

    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', '=', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Wrong email and/or password'], 401);
        }

        if (Hash::check($password, $user->password)) {
            Auth::login($user);
            unset($user->password);
            return response()->json(['token' => $this->createToken($user)]);
        } else {
            return response()->json(['message' => 'Wrong email and/or password'], 401);
        }
    }

    /**
     * Create Email and Password Account.
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'birthdate' => 'required',
            'ap_pat' => 'required',
            'email' => 'required|email|unique:user,email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 422);
        }
        $user = new User;
        $user->name = $request->input('name');
        $user->birthdate = $request->input('birthdate');
        $user->ap_pat = $request->input('ap_pat');
        $user->ap_mat = $request->input('ap_mat');
        $user->status = 0;
        $user->user_type = 1;
        $user->api_key = str_random(1024);
        $user->token = str_random(1024);
        $user->nickname = $request->input('name') . " " . $request->input('ap_pat');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        Auth::login($user);
        return response()->json(['token' => $this->createToken($user)]);
    }

    /**
     * sessions
     */
    public function profile(Request $request)
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function sessions(Request $request)
    {
        $user = (Object)[
            'first_name' => "",
            "last_name" => "",
            "email" => "",
            "facebook" => "",
            'google' => "",
            'twitter' => "",
            'linkedin' => '',
            "gender" => "",
            'picture' => "",
            'screen_name' => ""
        ];
        if (Session::has("fb")) {
            $fb = (Object)Session::get("fb");
            $user->first_name = $fb->first_name;
            $user->last_name = $fb->last_name;
            $user->email = $fb->email;
            $user->facebook = $fb->id;
            $user->screen_name = $fb->name;
        }
        if (Session::has("twitter")) {
            $twitter = (Object)Session::get("twitter");
            $user->twitter = $twitter->id;
            $user->first_name = $twitter->name;
            $user->screen_name = $twitter->screen_name;
        }
        if (Session::has('google')) {
            $google = (Object)Session::get('google');
            $user->google = $google->sub;
            $user->first_name = $google->given_name;
            $user->last_name = $google->family_name;
            $user->email = $google->email;
            $user->gender = $google->gender;
            $user->screen_name = $google->name;
        }
        Session::flush();
        return response()->json(["session" => $user], 200);

    }

    /**
     * Login with Facebook.
     */
    public function facebook(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => Config::get('app.facebook_secret')
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('facebook', '=', $profile['id'])->orWhere('email', $profile['email']);

            if ($user->first()) {
                return response()->json(['message' => 'There is already a Facebook account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->facebook = $profile['id'];
            $user->email = $user->email ?: $profile['email'];
            $user->nickname = $user->nickname ?: $profile['name'];
            $user->save();
            return response()->json(['token' => $this->createToken($user)]);
        } // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('facebook', '=', $profile['id'])->orWhere('email', $profile['email'])->first();

            if ($user) {
                Auth::login($user);
                return response()->json(['token' => $this->createToken($user->first())]);
            }
            Session::set('fb', $profile);
            return response()->json(['msg' => "Usuario no registrado"], 406);
        }
    }

    /**
     * Login with Google.
     */
    public function google(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.google_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://www.googleapis.com/plus/v1/people/me/openIdConnect', [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('google', '=', $profile['sub']);

            if ($user->first()) {
                return response()->json(['message' => 'There is already a Google account that belongs to you'], 409);
            }
            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
            $user = User::find($payload['sub']);
            $user->google = $profile['sub'];
            $user->nickname = $user->nickname ?: $profile['name'];
            $user->save();
            return response()->json(['token' => $this->createToken($user)]);
        } // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('google', '=', $profile['sub']);
            if ($user->first()) {
                Auth::login($user);
                return response()->json(['token' => $this->createToken($user->first())]);
            }
            Session::set('google', $profile);
            return response()->json(['msg' => "Usuario no registrado"], 406);
        }
    }

    /**
     * Login with LinkedIn.
     */
    public function linkedin(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.linkedin_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://www.linkedin.com/uas/oauth2/accessToken', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)', [
            'query' => [
                'oauth2_access_token' => $accessToken['access_token'],
                'format' => 'json'
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('linkedin', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['message' => 'There is already a LinkedIn account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->linkedin = $profile['id'];
            $user->nickname = $user->nickname ?: $profile['firstName'] . ' ' . $profile['lastName'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        } // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('linkedin', '=', $profile['id']);

            if ($user->first()) {
                Auth::login($user);
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            Session::set('linkedin', $profile);

            return response()->json(['msg' => "Usuario no registrado"], 406);
        }
    }

    /**
     * Login with Twitter.
     */
    public function twitter(Request $request)
    {
        $stack = GuzzleHttp\HandlerStack::create();

        // Part 1 of 2: Initial request from Satellizer.
        if (!$request->input('oauth_token') || !$request->input('oauth_verifier')) {
            $stack = GuzzleHttp\HandlerStack::create();

            $requestTokenOauth = new Oauth1([
                'consumer_key' => Config::get('app.twitter_key'),
                'consumer_secret' => Config::get('app.twitter_secret'),
                'callback' => $request->input('redirectUri'),
                'token' => '',
                'token_secret' => ''
            ]);
            $stack->push($requestTokenOauth);

            $client = new GuzzleHttp\Client([
                'handler' => $stack
            ]);

            // Step 1. Obtain request token for the authorization popup.
            $requestTokenResponse = $client->request('POST', 'https://api.twitter.com/oauth/request_token', [
                'auth' => 'oauth'
            ]);

            $oauthToken = array();
            parse_str($requestTokenResponse->getBody(), $oauthToken);

            // Step 2. Send OAuth token back to open the authorization screen.
            return response()->json($oauthToken);

        } // Part 2 of 2: Second request after Authorize app is clicked.
        else {
            $accessTokenOauth = new Oauth1([
                'consumer_key' => Config::get('app.twitter_key'),
                'consumer_secret' => Config::get('app.twitter_secret'),
                'token' => $request->input('oauth_token'),
                'verifier' => $request->input('oauth_verifier'),
                'token_secret' => ''
            ]);
            $stack->push($accessTokenOauth);

            $client = new GuzzleHttp\Client([
                'handler' => $stack
            ]);

            // Step 3. Exchange oauth token and oauth verifier for access token.
            $accessTokenResponse = $client->request('POST', 'https://api.twitter.com/oauth/access_token', [
                'auth' => 'oauth'
            ]);

            $accessToken = array();
            parse_str($accessTokenResponse->getBody(), $accessToken);

            $profileOauth = new Oauth1([
                'consumer_key' => Config::get('app.twitter_key'),
                'consumer_secret' => Config::get('app.twitter_secret'),
                'oauth_token' => $accessToken['oauth_token'],
                'token_secret' => ''
            ]);
            $stack->push($profileOauth);

            $client = new GuzzleHttp\Client([
                'handler' => $stack
            ]);

            // Step 4. Retrieve profile information about the current user.
            $profileResponse = $client->request('GET', 'https://api.twitter.com/1.1/users/show.json?screen_name=' . $accessToken['screen_name'], [
                'auth' => 'oauth'
            ]);
            $profile = json_decode($profileResponse->getBody(), true);

            // Step 5a. Link user accounts.
            if ($request->header('Authorization')) {
                $user = User::where('twitter', '=', $profile['id']);
                if ($user->first()) {
                    return response()->json(['message' => 'There is already a Twitter account that belongs to you'], 409);
                }

                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

                $user = User::find($payload['sub']);
                $user->twitter = $profile['id'];
                $user->nickname = $user->nickname ?: $profile['screen_name'];
                $user->save();

                return response()->json(['token' => $this->createToken($user)]);
            } // Step 5b. Create a new user account or return an existing one.
            else {
                $user = User::where('twitter', '=', $profile['id']);

                if ($user->first()) {
                    Auth::login($user);
                    return response()->json(['token' => $this->createToken($user->first())]);
                }


                Session::set('twitter', $profile);

                return response()->json(['msg' => "Usuario no registrado"], 406);
            }
        }
    }

    /**
     * Login with Foursquare.
     */
    public function foursquare(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.foursquare_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://foursquare.com/oauth2/access_token', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.foursquare.com/v2/users/self', [
            'query' => [
                'v' => '20140806',
                'oauth_token' => $accessToken['access_token']
            ]
        ]);

        $profile = json_decode($profileResponse->getBody(), true)['response']['user'];

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('foursquare', '=', $profile['id']);
            if ($user->first()) {
                return response()->json(array('message' => 'There is already a Foursquare account that belongs to you'), 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->foursquare = $profile['id'];
            $user->nickname = $user->nickname ?: $profile['firstName'] . ' ' . $profile['lastName'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        } // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('foursquare', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new User;
            $user->foursquare = $profile['id'];
            $user->nickname = $profile['firstName'] . ' ' . $profile['lastName'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    /**
     * Login with Instagram.
     */
    public function instagram(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.instagram_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://api.instagram.com/oauth/access_token', [
            'body' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('instagram', '=', $accessToken['user']['id']);
            if ($user->first()) {
                return response()->json(array('message' => 'There is already an Instagram account that belongs to you'), 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->instagram = $accessToken['user']['id'];
            $user->nickname = $user->nickname ?: $accessToken['user']['username'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        } // Step 2b. Create a new user account or return an existing one.
        else {
            $user = User::where('instagram', '=', $accessToken['user']['id']);

            if ($user->first()) {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new User;
            $user->instagram = $accessToken['user']['id'];
            $user->nickname = $accessToken['user']['username'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    /**
     * Login with GitHub.
     */
    public function github(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.github_secret'),
            'redirect_uri' => $request->input('redirectUri')
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://github.com/login/oauth/access_token', [
            'query' => $params
        ]);

        $accessToken = array();
        parse_str($accessTokenResponse->getBody(), $accessToken);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.github.com/user', [
            'headers' => ['User-Agent' => 'Satellizer'],
            'query' => $accessToken
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('github', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['message' => 'There is already a GitHub account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));

            $user = User::find($payload['sub']);
            $user->github = $profile['id'];
            $user->nickname = $user->nickname ?: $profile['name'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        } // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('github', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new User;
            $user->github = $profile['id'];
            $user->nickname = $profile['name'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
    }
}