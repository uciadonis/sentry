import type {BaseGroup, Event, GroupStats, Project} from 'sentry/types';

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type FeedbackIssue = Overwrite<
  BaseGroup & GroupStats,
  {
    issueCategory: 'feedback';
    issueType: 'feedback';
    metadata: {
      contact_email: null | string;
      message: string;
      name: null | string;
      title: string;
      value: string;
      initial_priority?: number;
      sdk?: {
        name: string;
        name_normalized: string;
      };
      source?: null | string;
    };
    owners: null | unknown;
    project?: Project;
  }
>;

export type FeedbackEvent = Event;

export type FeedbackIssueListItem = Overwrite<
  BaseGroup & GroupStats,
  {
    issueCategory: 'feedback';
    issueType: 'feedback';
    metadata: {
      contact_email: null | string;
      message: string;
      name: string;
      title: string;
      value: string;
      sdk?: {
        name: string;
        name_normalized: string;
      };
      source?: null | string;
    };
    owners: null | unknown;
    project?: Project;
  }
>;
