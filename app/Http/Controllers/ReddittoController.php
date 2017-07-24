<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Frankkessler\Guzzle\Oauth2\GrantType\PasswordCredentials;
use Frankkessler\Guzzle\Oauth2\Oauth2Client;


class ReddittoController extends Controller
{
    private $_guzzle;
    private $_base_uri = 'https://www.reddit.com';
    private $_config = array();
    private $_user_agent = 'web:app.redditto:redditto:v1.0 (by /u/murnun)';

    /**
     * Constructor
     */
    public function __construct(){

        $this->_guzzle = new Oauth2Client(['base_uri' => $this->_base_uri]);

        $this->_config = [
          'username' => $_ENV['REDDIT_USERNAME'],
          'password' => $_ENV['REDDIT_PASSWORD'],
          'client_id' => $_ENV['REDDIT_CLIENT_ID'],
          'scope' => $_ENV['REDDIT_SCOPE'],
        ];

        $token = new PasswordCredentials($this->_config);
        $this->_guzzle->setGrantType($token);
    }

    /**
     * Fetches data from reddit endpoint as per given $page
     */
    public function retrieveList($page, $count, $dir=null, $pageToken=null, $urlQuery=null){

        if(!in_array($page, ['hot','new', 'search'])){
            return response()->json([
              'status'=>false,
              'message'=>'Page not found.'
            ]);
        }

        $pageParam = (isset($dir))? '&'.$dir.'='.$pageToken : '';
        $endpoint = $page.'.json?count='.$count.$pageParam.$urlQuery;
        // dd($endpoint);
        $response = $this->_guzzle->get($this->_base_uri.'/'.$endpoint, [
            'headers' => [
              'User-Agent' => $this->_user_agent
            ]
        ]);

        return (string) $response->getBody();

    }

    /**
     * Fetches search result from reddit endpoint as per given search $term
     */
     public function search(Request $request){

         $count = $request->input('count');
         $dir = $request->input('dir');
         $pageToken = $request->input('token');
         $urlQuery = '&q='.$request->input('terms');

         $response = $this->retrieveList('search', $count, $dir, $pageToken, $urlQuery);

         $header = array(
                'Content-Type' => 'application/json; charset=UTF-8',
                'charset' => 'utf-8'
            );

         return response()->json($response, 200, $header, JSON_UNESCAPED_UNICODE);

     }

     /**
      * Fetches search result from reddit endpoint as per given search $term
      */
      public function categoryPage($category, Request $request){

          $count = $request->input('count');
          $dir = $request->input('dir');
          $pageToken = $request->input('token');
          $urlQuery = '&q='.$request->input('terms');

          $response = $this->retrieveList($category, $count, $dir, $pageToken, $urlQuery);

          $header = array(
                 'Content-Type' => 'application/json; charset=UTF-8',
                 'charset' => 'utf-8'
             );

          return response()->json($response, 200, $header, JSON_UNESCAPED_UNICODE);

      }
}
