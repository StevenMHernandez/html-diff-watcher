# Watch for html changes based on a jQuery selector

Pulls html from a url. Checks to see if there have been any changes since the last pull (old versions are saved as an html file). If there have been changes, emails you to show you the changes.

## Setup

`npm install`

`mv config/example.email.json config/email.json` then edit email.json *[emailjs reference](https://github.com/eleith/emailjs)*

"scripts" can be added to `/scripts`

## Example `Script`

```
{
  "request_options": {
    "url": "https://google.com"
  },
  "selector": "#hplogo",
  "email": {
    "subject": "New Google Doodle"
  }
}
```

This script loads google.com, then selects the item with an id of `hplogo`. If the script had been run before, it compares the previous one with the new version. If there has been a change, it will email you (based on the email at `/config` showing you the new html of the selector.


```
{
  "authenticate": {
    "url": "https://example.com/login/example",
    "form": {
      "user": "example",
      "pass": "example"
    }
  },
  "request_options": {
    "url": "https://google.com"
  },
  "selector": "#hplogo",
  "email": {
    "subject": "New Google Doodle"
  }
}
```

This example makes the `authenticate` post request first, remembers any cookies, then makes the normal request.

It's a quick way to *simulate* submitting a login form.

## Usage

`node src/index.js`
