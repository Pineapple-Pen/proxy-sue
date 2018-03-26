module.exports = (title, body, scripts) => `
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/style.css">
    <title>${title}</title>
  </head>
  <body>
  ${body}
  </body>
  ${scripts}
</html>
`;
