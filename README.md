# What happens here? 

It's a SMS quiz.

## QUIZ #1

> in `api/sms.js`

First, you just get a SMS with a couple of hints. 

The passphrase is `adler`, it's encoded as ASCII in the SMS.

## QUIZ #2

> in `api/sms.js`, leads you to `index.html`, which then leads to `api/secure.js`

Then you get a Caesar-encoded message. Decrypt it to get URL and password of a page.

You will have to enter `donnerschlag` on `https://agents.now.sh`

## QUIZ #3

> in `api/sms.js`

On that page, there's a riddle. Search for `#WholesomeSecrets` on Twitter,

find user "Secret Agents", and in his Bio it says you have to send a SMS with `Heimat` in it.

