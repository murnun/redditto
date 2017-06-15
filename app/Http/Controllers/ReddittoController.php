<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
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
     * Fetches data from reddit endpoint as per given $category
     */
    public function retrieveList($category, $count, $dir=null, $pageToken=null)
    {
        if(!in_array($category, ['hot','new'])){
            return response()->json([
              'status'=>false,
              'message'=>'Category not found.'
            ]);
        }
        $pageParam = (isset($dir))? '&'.$dir.'='.$pageToken : '';
        $urlQuery = $category.'.json?count='.$count.$pageParam;

        $response = $this->_guzzle->get($this->_base_uri.'/'.$urlQuery, [
            'headers' => [
              'User-Agent' => $this->_user_agent
            ]
        ]);

        $response_body = (string) $response->getBody();

        return response()->json($response_body);
    }

    //
}
