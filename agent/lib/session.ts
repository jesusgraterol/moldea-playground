import { defineState } from 'eve/context';

export interface ReleaseSession {
  selectedReleaseId: string | null;
}

export const releaseSession = defineState<ReleaseSession>('launch-room.release', () => ({
  selectedReleaseId: null,
}));
