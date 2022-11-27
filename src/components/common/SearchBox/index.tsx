import { SearchResultItem } from 'models';
import SearchBoxDesktop from './SearchBoxDesktop';

export interface SearchResult {
  list: SearchResultItem[];
  length: number;
  isMore: boolean;
}

export function SearchBox() {
  return <SearchBoxDesktop />;
}
