import { useCustomMediaQuery } from '~/hooks/common';
import { SearchBoxDesktop } from './SearchBoxDesktop';
import { SearchBoxMobile } from './SearchBoxMobile';

export function SearchBox() {
  const mdUp = useCustomMediaQuery('up', 'md');

  return mdUp ? <SearchBoxDesktop /> : <></>;
}
