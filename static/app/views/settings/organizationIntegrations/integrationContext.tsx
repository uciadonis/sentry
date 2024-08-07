import {createContext} from 'react';

import type {IntegrationProvider, IntegrationType} from 'sentry/types/integrations';

export type IntegrationContextProps = {
  analyticsParams: {
    already_installed: boolean;
    view:
      | 'integrations_directory_integration_detail'
      | 'integrations_directory'
      | 'onboarding'
      | 'project_creation';
  };
  installStatus: string;
  provider: IntegrationProvider;
  type: IntegrationType;
  modalParams?: {[key: string]: string};
};

export const IntegrationContext = createContext<IntegrationContextProps | undefined>(
  undefined
);
