import { AxiosInstance } from 'axios';
import { SearchParamsType } from 'features/books/books-reducer';

export class BooksApi {
  constructor(private instance: AxiosInstance) {}

  public getBooks(params: ParamsType) {
    return this.instance.get<ResponseType>('/volumes', { params });
  }
}

// Types

export type ParamsType = Omit<SearchParamsType, 'subject'> & {
  key?: string;
};

type ResponseType = {
  totalItems: number;
  items?: BookType[];
};

export type BookType = {
  id: string;
  volumeInfo: VolumeInfoType;
};

export type VolumeInfoType = {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  pageCount: number;
  categories: string[];
  imageLinks: ImageLinksType;
};

type ImageLinksType = {
  smallThumbnail: string;
  thumbnail: string;
};
