const fetch = require("node-fetch");
module.exports = async function (text) {
  const f = fetch("https://hastebin.uwuv3.repl.co/hastebin", {
    headers: { "Content-Type": "text/plain" },
    body: text,
    method: "POST",
  })
    .then((res) => res.json())
    .then((d) => {
      return `${d.html}`;
    });
    return f
};
