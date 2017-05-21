import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import session from 'express-session';
import Promise from 'bluebird';
import 'babel-polyfill';

module.exports = () => {
  const app = express();

  app.use(session({
    secret: 'yoba',
    cookie: {
      httpOnly: false
    },
    resave: true,
    saveUninitialized: true
  }));

  app.post('/api/game', bodyParser.json(), (req, res) => {
    const gameData = req.session.gameData || [];
    req.session.gameData = [...gameData, req.body];
    res.json(req.body);
  });

  app.get('/api/game/:name', (req, res) => {
    const gameList = (req.session.gameData || []).filter(game => game.name === req.params.name);
    res.json((gameList.length && gameList[0]) || []);
  });

  app.get('/api/games', (req, res) => {
    res.json(req.session.gameData || []);
  });


  app.get('/', async (req, res) => {
    const templatePath = './src/index.ejs';
    const data = {
      title: 'Wix Full Stack Project Boilerplate',
      staticsBaseUrl: 'http://localhost:3200/',
      baseurl: 'http://localhost:3000/',
      locale: 'en'
    };

    const renderFile = await Promise.promisify(ejs.renderFile, {context: ejs});

    const htmlData = await renderFile(templatePath, data);

    res.send(htmlData);
  });

  return app;
};
