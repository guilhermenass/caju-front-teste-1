export type SearchbarProps = {
  document: string
  onSearch: (document: string) => void;
  onRefetch: () => void;
};


export const VALID_DOCUMENT_LENGTH = 11