<?php

/**
 * @author      Pieter Beulque <pieterbeulque@gmail.com>, Bramus Van Damme <bramus@bram.us>
 * @copyright   Copyright (c), 2013 Bramus Van Damme
 * @license     GNU General Public License 3 (http://www.gnu.org/licenses/)
 */

class JSONResponse
{

    /**
     * HTTP status
     *
     * @var array
     */
    private $status;

    /**
     * Response data
     *
     * @var multi
     */
    private $data;

    public function __construct ()
    {
        $this->setStatus(200);
        $this->setData('');
    }

    public function finish ()
    {
        $res = array();
        $res['status'] = $this->status;
        $res['data'] = $this->data;

        $json = json_encode($res);

        // Set headers
        // No cache
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

        // Correct content type
        header('Content-type: application/json');

        die($json);
    }

    /**
     * Sets the statusObject
     * @var String $status
     * @var String $statusText
     */
    public function setStatus ($statusCode)
    {
        // Long list. Just remember these though: 200, 201, 204, (301, 302,) 400, 401, 403, 404, 500, 501
        $codes = Array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Reserved)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            418 => 'I\'m a teapot',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported'
        );

        $statusCode = (int) (in_array($statusCode, array_keys($codes)) ? $statusCode : 500);

        $this->status = array(
            'code' => $statusCode,
            'text' => $codes[$statusCode]
        );

        header('HTTP/1.1 ' . $this->status['code'] . ' ' . $this->status['text']);
    }

    /**
     * Sets the data to output
     * @var array
     */
    public function setData ($data)
    {
        $this->data = $data;
    }
}