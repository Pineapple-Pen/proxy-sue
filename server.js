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
const App = require('./templates/app.js');
const Scripts = require('./templates/scripts.js');

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
    Scripts(Object.keys(services),req.params.id)
  ));
});

app.get('/api/restaurants/:id/overview', (req, res) => {
  res.redirect(`http://localhost:3001/api/restaurants/${req.params.id}/overview`)
});

app.get('/api/restaurants/:id/photo', (req, res) => {
  res.redirect(`http://10.8.65.173:3002/api/restaurants/${req.params.id}/photos`)
});

app.get('/api/restaurants/:id/sidebar', (req, res) => {
  res.redirect(`http://10.8.65.25:3003/api/restaurants/${req.params.id}/sidebar`)
});

app.get('/api/restaurants/:id/recommendations', (req, res) => {
  res.redirect(`http://10.8.65.181:3004/api/restaurants/${req.params.id}/recommendations`)
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)});


