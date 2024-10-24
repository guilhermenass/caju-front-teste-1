export type SearchbarProps = {
  onSearch: (document: string) => void;
  onRefetch: () => void;
};


export const VALID_DOCUMENT_LENGTH = 11