import { IVideo, NewVideo } from './video.model';

export const sampleWithRequiredData: IVideo = {
  id: 25330,
};

export const sampleWithPartialData: IVideo = {
  id: 13717,
  description: 'sexy Architect',
};

export const sampleWithFullData: IVideo = {
  id: 26517,
  title: 'Keyboard',
  videoId: 'Engineer firewall',
  description: 'Garden',
};

export const sampleWithNewData: NewVideo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
