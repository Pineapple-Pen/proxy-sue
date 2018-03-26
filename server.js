const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout.js');
const App = require('./templates/app.js');//file ext
const Scripts = require('./templates/scripts.js');

// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(restaurants => {
    let component = React.createElement(components[restaurants], props);
    return ReactDom.renderToString(component);
  });
}

app.get('/restaurants/:id', function(req, res){
  let components = renderComponents(services, {restaurantsid: req.params.id});
  res.end(Layout(
    'SDC',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
