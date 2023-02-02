import { useCustomMediaQuery } from '~/hooks';
import { SearchBoxDesktop } from './SearchBoxDesktop';
import { SearchBoxMobile } from './SearchBoxMobile';

export function SearchBox() {
  const mdUp = useCustomMediaQuery('up', 'md');

  return mdUp ? <SearchBoxDesktop /> : <SearchBoxMobile />;
}
