import {useCallback} from 'react';
import * as Sentry from '@sentry/react';

import type {MRI} from 'sentry/types/metrics';
import {getReadableMetricType} from 'sentry/utils/metrics/formatters';
import {parseMRI} from 'sentry/utils/metrics/mri';

interface Options {
  mri: MRI;
  aggregation?: string;
  groupBy?: string[];
  query?: string;
}

export const useIncrementQueryMetric = (options: Options) => {
  return useCallback(
    (metricName: string, values: Partial<Options>) => {
      const mergedValues = {
        mri: options.mri,
        groupBy: options.groupBy,
        aggregation: options.aggregation,
        query: options.query,
        ...values,
      };
      Sentry.metrics.increment(metricName, 1, {
        tags: {
          type: getReadableMetricType(parseMRI(mergedValues.mri)?.type),
          operation: mergedValues.aggregation,
          isGrouped: !!mergedValues.groupBy?.length,
          isFiltered: !!mergedValues.query,
        },
      });
    },
    [options.mri, options.groupBy, options.aggregation, options.query]
  );
};
