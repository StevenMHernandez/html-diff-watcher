var fs = require('fs');
var path = require('path');
var requester = require("./requester");

// get all files from scripts directory
fs.readdir(path.join(__dirname, "../scripts"), function (err, filenames) {
    filenames.forEach(function (filename) {
        // get all .json files
        if (filename.match("\.json$") == "\.json") {
            console.log("loading:", filename);

            // load the json file
            var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../scripts/' + filename), 'utf8'));
            config.filename = filename.replace(".json", "");

             // make request
            requester.make_request(config);
        }
    });
});
