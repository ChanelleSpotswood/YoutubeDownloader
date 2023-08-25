import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'video',
        data: { pageTitle: 'youtubeDownloaderApp.video.home.title' },
        loadChildren: () => import('./video/video.module').then(m => m.VideoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
