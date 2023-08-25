import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVideo, NewVideo } from '../video.model';

export type PartialUpdateVideo = Partial<IVideo> & Pick<IVideo, 'id'>;

export type EntityResponseType = HttpResponse<IVideo>;
export type EntityArrayResponseType = HttpResponse<IVideo[]>;

@Injectable({ providedIn: 'root' })
export class VideoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/videos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(video: NewVideo): Observable<EntityResponseType> {
    return this.http.post<IVideo>(this.resourceUrl, video, { observe: 'response' });
  }

  update(video: IVideo): Observable<EntityResponseType> {
    return this.http.put<IVideo>(`${this.resourceUrl}/${this.getVideoIdentifier(video)}`, video, { observe: 'response' });
  }

  partialUpdate(video: PartialUpdateVideo): Observable<EntityResponseType> {
    return this.http.patch<IVideo>(`${this.resourceUrl}/${this.getVideoIdentifier(video)}`, video, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVideo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVideo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVideoIdentifier(video: Pick<IVideo, 'id'>): number {
    return video.id;
  }

  compareVideo(o1: Pick<IVideo, 'id'> | null, o2: Pick<IVideo, 'id'> | null): boolean {
    return o1 && o2 ? this.getVideoIdentifier(o1) === this.getVideoIdentifier(o2) : o1 === o2;
  }

  addVideoToCollectionIfMissing<Type extends Pick<IVideo, 'id'>>(
    videoCollection: Type[],
    ...videosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const videos: Type[] = videosToCheck.filter(isPresent);
    if (videos.length > 0) {
      const videoCollectionIdentifiers = videoCollection.map(videoItem => this.getVideoIdentifier(videoItem)!);
      const videosToAdd = videos.filter(videoItem => {
        const videoIdentifier = this.getVideoIdentifier(videoItem);
        if (videoCollectionIdentifiers.includes(videoIdentifier)) {
          return false;
        }
        videoCollectionIdentifiers.push(videoIdentifier);
        return true;
      });
      return [...videosToAdd, ...videoCollection];
    }
    return videoCollection;
  }
}
