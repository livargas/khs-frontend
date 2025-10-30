import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { supabase } from  'src/supabase.config';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  _session: AuthSession | null = null;

  get session() {
    supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  downLoadImage(path: string) {
    return supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return supabase.storage.from('avatars').upload(filePath, file);
  }
}
