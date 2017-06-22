import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { RoutesController } from './controllers/routes.controller';
import { StaticFilesController } from './controllers/static-files.controller';
import { FileCacheService } from './services/file-cache.service';
import { ServerRenderService } from './services/server-render.service';

@NgModule({
  imports: [
    ServerModule,
  ],
  providers: [
    FileCacheService,
    RoutesController,
    ServerRenderService,
    StaticFilesController
  ]
})
export class AppExpressModule {
  ngDoBootstrap() { }
}
