import {createContext, PropsWithChildren, useContext} from 'react';
import {Session} from '@supabase/supabase-js';

const SessionContext = createContext<Session>({} as Session);

export function SessionProvider(props: PropsWithChildren<{value: Session}>) {
  return (
    <SessionContext.Provider value={props.value}>
      {props.children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
