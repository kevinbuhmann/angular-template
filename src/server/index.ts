import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import './../rxjs-operators';

import { enableProdMode } from '@angular/core';
import * as compression from 'compression';
import * as express from 'express';
import * as expressLogging from 'express-logging';
import { createServer } from 'http';
import * as logops from 'logops';
import { registerController } from 'rx-routes';

import { environment } from './../environments/environment';
import { AppExpressModule } from './app-express.module';
import { RoutesController } from './controllers/routes.controller';
import { StaticFilesController } from './controllers/static-files.controller';
import { getInjector } from './utilities/get-injector';
import { handleRequestError } from './utilities/handle-request-error';

(async function () {
  enableProdMode();

  const injector = await getInjector(AppExpressModule);
  const routesController = injector.get(RoutesController);
  const staticFilesController = injector.get(StaticFilesController);

  const app = express();
  const server = createServer(app);

  app.use(compression());

  app.use(expressLogging(logops));

  registerController(app, routesController, handleRequestError);

  registerController(app, staticFilesController, handleRequestError);

  server.listen(environment.serverPort, () => {
    console.log(`listening on port ${environment.serverPort}`);

    if (process.send) {
      process.send('listening');
    }
  });
})();
