import {forwardRef} from 'react';

import type {SVGIconProps} from './svgIcon';
import {SvgIcon} from './svgIcon';

const IconWifi = forwardRef<SVGSVGElement, SVGIconProps>((props, ref) => {
  return (
    <SvgIcon {...props} ref={ref}>
      <path d="M8,15.29c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9,2.9,1.3,2.9,2.9-1.3,2.9-2.9,2.9ZM8,11c-.77,0-1.4.63-1.4,1.4s.63,1.4,1.4,1.4,1.4-.63,1.4-1.4-.63-1.4-1.4-1.4Z" />
      <path d="M15.23,4.81c-.17,0-.34-.06-.48-.17-1.89-1.57-4.29-2.43-6.75-2.43s-4.87.86-6.76,2.43c-.32.26-.79.22-1.06-.1-.26-.32-.22-.79.1-1.06C2.45,1.69,5.18.71,7.99.71s5.56.99,7.72,2.78c.32.26.36.74.1,1.06-.15.18-.36.27-.58.27Z" />
      <path d="M12.84,8.57c-.19,0-.38-.07-.52-.21-1.16-1.13-2.69-1.76-4.31-1.76s-3.16.62-4.32,1.76c-.3.29-.77.28-1.06-.01-.29-.3-.28-.77.01-1.06,1.44-1.41,3.35-2.19,5.36-2.19s3.93.78,5.37,2.19c.3.29.3.76.01,1.06-.15.15-.34.23-.54.23Z" />
    </SvgIcon>
  );
});

IconWifi.displayName = 'IconWifi';

export {IconWifi};
