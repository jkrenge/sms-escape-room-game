const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

const caesar = require('../lib/caesar')

const randomInteger = (low, high) => Math.floor(Math.random() * (high - low + 1) + low)
const rand = string => string[randomInteger(0, string.length - 1)]

const hintsForFirstQuiz = [
  { hint: 1, text: '61 64 6C 65 72' },
  { hint: 2, text: 'Our comms will be encoded, then encrypted.' },
  { hint: 3, text: 'This is not a universal code.' }
]

/**
 * QUIZ #1: if nothing specific is being asked, i.e. at the beginning, answer with like this
 */
function fallbackResponse (req, res) {
  var twiml = new MessagingResponse()

  const optionsFirstSentence = [
    'Wrong number, get lost!',
    'What do you want?!',
    'Don\'t text me!',
    'I\'m not whoever you\'re looking for.',
    'Please stop texting me.',
    'Nein.'
  ]

  var hint = rand(hintsForFirstQuiz)
  twiml.message(`${rand(optionsFirstSentence)}\n\n${hint.text}\n\n(${hint.hint}/3)`)
  res.end(twiml.toString())
}

/**
 * QUIZ #1: gives a specific hint for the first quiz
 */
function respondWithSpecficHint (req, res) {
  var twiml = new MessagingResponse()

  const optionsFirstSentence = [
    'You\'re looking for this?',
    'Is this what you need?',
    'Does this help?',
    'Okay.'
  ]

  var requestedHint = /(\d)\s?(of|\/)\s?3/i.exec(req.body.Body)
  if (requestedHint) {
    var hint = parseInt(requestedHint[1], 10)
    if (hint > 0 && hint <= hintsForFirstQuiz.length) {
      twiml.message(`${rand(optionsFirstSentence)}\n\n${hintsForFirstQuiz[hint - 1].text}`)
      res.end(twiml.toString())
    } else fallbackResponse(req, res)
  } else fallbackResponse(req, res)
}

/**
 * SOLUTION #1: responds to passphrase "adler"
 */
function respondToAdler (req, res) {
  var receivedFromNumber = req.body.From
  var twiml = new MessagingResponse()

  client
    .messages
    .create({
      body: caesar('enter the password "donnerschlag" at https://agents.now.sh/\n\n- caesar'),
      from: 'caesar',
      to: receivedFromNumber
    })
    .then(function () {
      var reply = [
        'This line is not secure.',
        'Contacting you via my satellite phone with an encrypted message at',
        receivedFromNumber + ''
      ]
      twiml.message(reply.join('\n'))
      res.end(twiml.toString())
    })
}

/**
 * QUIZ #2: Give a hint for Caesar encryption
 */
function respondToCaesar (req, res) {
  var twiml = new MessagingResponse()

  const possibleResponses = [
    'Caesar is weird one, isn\'t he?',
    'I know, I know... Caesar again.'
  ]

  twiml.message(`${rand(possibleResponses)}\n\nHe only texts in his own encryption.`)
  res.end(twiml.toString())
}

/**
 * QUIZ #3: Gives a hint to Twitter
 */
function respondToTwitter (req, res) {
  var twiml = new MessagingResponse()

  const possibleResponses = [
    'What are you saying?',
    'Excuse me?',
    'What now?',
    'Sorry, what\'s that?'
  ]

  twiml.message(`${rand(possibleResponses)}\n\nModern Birds... maybe that's like a social network? With birds?!`)
  res.end(twiml.toString())
}

/**
 * QUIZ #3: Gives a hint to #WholesomeSecrets
 */
function respondToHashtag (req, res) {
  var twiml = new MessagingResponse()

  const possibleResponses = [
    'What are you saying?',
    'Excuse me?',
    'What now?',
    'Sorry, what\'s that?'
  ]

  twiml.message(`${rand(possibleResponses)}\n\nA pound of wholesome secrets? Well, what's a pound? Money, weight, or a character, isn't it?`)
  res.end(twiml.toString())
}

/**
 * SOLUTION #3: responds to phrase "Heimat"
 */
function respondToHeimat (req, res) {
  var twiml = new MessagingResponse()

  const possibleResponses = [
    'Ah yes, Heimat...',
    'Home sweet home.'
  ]

  twiml.message(`${rand(possibleResponses)}\n\nYour code: FINISHED`)
  res.end(twiml.toString())
}

/**
 * API handler
 */
module.exports = function (req, res) {
  if (!req.body) return res.send('pong')
  var reveivedMessage = req.body.Body
  res.writeHead(200, { 'Content-Type': 'text/xml' })

  if (/adler/i.test(reveivedMessage)) respondToAdler(req, res)
  else if (/c[ae]{2}s(a|e)r/i.test(reveivedMessage)) respondToCaesar(req, res)
  else if (/heimat/i.test(reveivedMessage)) respondToHeimat(req, res)
  else if (/(\d)\s?(of|\/)\s?3/i.test(reveivedMessage)) respondWithSpecficHint(req, res)
  else if (/modern?\s*bird/i.test(reveivedMessage)) respondToTwitter(req, res)
  else if (/(pound|wholesome|secrets)/i.test(reveivedMessage)) respondToHashtag(req, res)
  else fallbackResponse(req, res)
}
