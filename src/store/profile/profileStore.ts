// store/profile/profileStore.ts
import { create } from 'zustand';
import axiosClient from '@/api/axiosClient';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified: boolean;
    created_at: string;
    address?: string;
  };
}

interface ProfileStore {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
}

// دالة لفصل الاسم الكامل إلى اسم أول واسم عائلة
const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
  if (!fullName) return { firstName: '', lastName: '' };
  
  const names = fullName.trim().split(' ');
  if (names.length === 1) {
    return { firstName: names[0], lastName: '' };
  } else {
    return { 
      firstName: names[0], 
      lastName: names.slice(1).join(' ') 
    };
  }
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    console.log('📡 جاري جلب بيانات الملف الشخصي...');
    set({ isLoading: true, error: null });
    
    try {
      const response = await axiosClient.get<ApiResponse>('/api/v1/profile');
      console.log('✅ استجابة API:', response.data);
      
      if (response.data.status && response.data.data) {
        const apiData = response.data.data;
        
        const { firstName, lastName } = splitFullName(apiData.name);
        
        const profileData: ProfileData = {
          name: apiData.name,
          email: apiData.email,
          phone: apiData.phone,
          firstName,
          lastName,
          address: apiData.address || ''
        };
        
        console.log('📦 بيانات الملف الشخصي المحولة:', profileData);
        set({ profile: profileData, isLoading: false });
      } else {
        set({ 
          error: response.data.message || 'فشل في جلب البيانات', 
          isLoading: false 
        });
      }
    } catch (error: any) {
      console.error('❌ خطأ في API:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'فشل في الاتصال بالخادم';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
    }
  },

  updateProfile: async (data: Partial<ProfileData>) => {
    console.log('✏️ جاري تحديث البيانات:', data);
    set({ isLoading: true, error: null });
    
    try {
      const updateData: any = { ...data };
      
      if (data.firstName || data.lastName) {
        const currentProfile = useProfileStore.getState().profile;
        const currentFirstName = data.firstName || currentProfile?.firstName || '';
        const currentLastName = data.lastName || currentProfile?.lastName || '';
        updateData.name = `${currentFirstName} ${currentLastName}`.trim();
        
        delete updateData.firstName;
        delete updateData.lastName;
      }
      
      console.log('📤 بيانات الإرسال للـ API:', updateData);
      
      const response = await axiosClient.put<ApiResponse>('/api/v1/profile', updateData);
      
      if (response.data.status && response.data.data) {
        const apiData = response.data.data;
        const { firstName, lastName } = splitFullName(apiData.name);
        
        const profileData: ProfileData = {
          name: apiData.name,
          email: apiData.email,
          phone: apiData.phone,
          firstName,
          lastName,
          address: apiData.address || ''
        };
        
        set({ profile: profileData, isLoading: false });
        console.log('✅ تم تحديث البيانات بنجاح:', profileData);
      } else {
        set({ 
          error: response.data.message || 'فشل في تحديث البيانات', 
          isLoading: false 
        });
      }
    } catch (error: any) {
      console.error('❌ خطأ في تحديث API:', error);
      const errorMessage = error.response?.data?.message || 
                          'فشل في تحديث الملف الشخصي';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
    }
  },
}));