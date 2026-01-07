import { create } from "zustand";
import axios from "axios";

export interface BlogAuthor {
  id: number;
  name: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  title_en: string;
  title_ar: string;
  short_description: string;
  short_description_en: string;
  short_description_ar: string;
  content: string;
  content_en: string;
  content_ar: string;
  featured_image: string;
  meta_description: string | null;
  meta_description_en: string | null;
  meta_description_ar: string | null;
  meta_keywords: string | null;
  meta_keywords_en: string | null;
  meta_keywords_ar: string | null;
  is_published: boolean;
  published_at: string;
  views_count: number;
  allow_comments: boolean;
  author: BlogAuthor;
  author_name: string;
  images: string[];
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface BlogResponse {
  status: boolean;
  message: string;
  data: BlogPost[];
  pagination: BlogPagination;
}

interface BlogsState {
  loading: boolean;
  error: string | null;
  blogs: BlogPost[];
  pagination: BlogPagination | null;
  singleBlog: BlogPost | null;
  loadingSingle: boolean;
  errorSingle: string | null;

  fetchBlogs: (lang: string, page?: number) => Promise<void>;
  fetchBlogBySlug: (slug: string, lang: string) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useBlogsStore = create<BlogsState>((set) => ({
  loading: false,
  error: null,
  blogs: [],
  pagination: null,
  singleBlog: null,
  loadingSingle: false,
  errorSingle: null,

  fetchBlogs: async (lang: string, page: number = 1) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get<BlogResponse>(`${baseUrl}api/v1/blogs`, {
        params: {
          page,
        },
        headers: {
          Accept: "application/json",
          "Accept-Language": lang,
        },
      });

      set({
        blogs: res.data.data,
        pagination: res.data.pagination,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch blogs",
        loading: false,
      });
    }
  },

  fetchBlogBySlug: async (slug: string, lang: string) => {
    try {
      set({ loadingSingle: true, errorSingle: null });

      const res = await axios.get<{ status: boolean; message: string; data: BlogPost }>(
        `${baseUrl}api/v1/blogs/${slug}`,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": lang,
          },
        }
      );

      set({
        singleBlog: res.data.data,
        loadingSingle: false,
        errorSingle: null,
      });
    } catch (err: any) {
      set({
        errorSingle: err?.response?.data?.message || "Failed to fetch blog",
        loadingSingle: false,
      });
    }
  },
}));

