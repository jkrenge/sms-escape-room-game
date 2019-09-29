module.exports = function (req, res) {
  if (/donnerschlag/i.test(req.query.password)) {
    const sentences = [
      'Welcome, Sturmbandf&uuml;hrer!',
      'We have hidden the code word in plain sight!',
      'Search the modern birds for a pound of wholesome secrets.',
      '— The Axis'
    ]

    res.send(`<html><head><title>Secrets</title></head><body>${sentences.join('<br><br>')}</body></html>`)
  } else res.send('Wrong password. <a href="..">back</a>')
}
