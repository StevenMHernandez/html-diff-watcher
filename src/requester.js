var fs = require('fs');
var path = require('path');
var filendir = require('filendir');
var cheerio = require('cheerio');
var email_config = require('../config/email');
var email = require('emailjs');
var request = require('request');

exports.make_request = function (config) {
    // check if we need to authenticate
    if (config.authenticate != undefined) {
        // allow cookies
        config.authenticate.jar = true;

        request(config.authenticate, function () {
            // make request
            request(config.request_options, request_callback);
        });
    } else {
        // make request
        request(config.request_options, request_callback);
    }

    ////////////
    // variables
    ////////////

    var html_storage_path = path.join(__dirname, "../storage/html/" + config.filename + ".html");

    ////////
    // setup
    ////////

    var server = email.server.connect({
        user: email_config.user,
        password: email_config.password,
        host: email_config.host,
        ssl: true
    });

    //////////
    // helpers
    //////////

    function request_callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);

            var html = $(config.selector).wrap('<div>').parent().html();

            if (html == null) {
                html = body;
            }

            if (html != getFile()) {
                writeToFile(html);
                sendEmail(html);
            }
        }
    }

    function fileExists(relPath) {
        return fs.existsSync(relPath);
    }

    function writeToFile(contents) {
        filendir.writeFileSync(html_storage_path, contents);
    }

    function getFile() {
        if (!fileExists(html_storage_path)) {
            return " ";
        }

        return fs.readFileSync(html_storage_path, 'utf8', function (err, data) {
            return data;
        });
    }

    function sendEmail(contents) {
        server.send({
            from: config.email.from || email_config.from,
            to: config.email.to || email_config.to,
            subject: config.email.subject,
            attachment: [
                {data: contents, alternative: true}
            ]
        });
    }
};
