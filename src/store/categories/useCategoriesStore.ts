import { create } from "zustand";
import axios from "axios";
interface CategoriesData {

}
interface Categories {
  loading: boolean;
  error: string | null;
}