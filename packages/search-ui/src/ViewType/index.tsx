import { useId } from '@react-aria/utils';
import { Button, ButtonGroup } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { useTranslation } from 'react-i18next';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import ViewOption from '../ViewOption';
import { ViewTypeProps } from './types';

const ViewType = (props: ViewTypeProps) => {
  const { t } = useTranslation('viewType');
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const { label = t('label'), size, styles: stylesProp, ...rest } = props;
  const id = `view-type-${useId()}`;
  const { viewType, setViewType } = useSearchContext();

  return (
    <ViewOption
      id={id}
      label={label}
      size={size}
      containerClassName={customClassNames.sorting?.container}
      labelClassName={customClassNames.sorting?.label}
      {...rest}
    >
      <ButtonGroup
        attached
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.viewType?.buttonGroup}
      >
        <Button
          onClick={() => setViewType('grid')}
          size={size}
          appearance={viewType === 'grid' ? 'primary' : undefined}
          aria-label={t('grid')}
        >
          &#8203;
          <IconSmallGrid />
        </Button>
        <Button
          onClick={() => setViewType('list')}
          size={size}
          appearance={viewType === 'list' ? 'primary' : undefined}
          aria-label={t('list')}
        >
          &#8203;
          <IconSmallList />
        </Button>
      </ButtonGroup>
    </ViewOption>
  );
};

export default ViewType;
export type { ViewTypeProps };
