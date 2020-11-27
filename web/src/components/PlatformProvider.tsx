import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import Subject from '../modules/Subject';
import { PlatformSchema } from './PlatformListProvider';

export type GetParam = {
    id: number;
};

class PlatformSubject extends Subject<Platform | null> {
    get = this.createAsync(async (param: GetParam) => {
        const { data } = await axios.get<Platform>(
            `/api/v1/platforms/${param.id}/`
        );
        return PlatformSchema.validateSync(data);
    });

    update = this.createAsync(async (param: Platform) => {
        const { data } = await axios.patch<Platform>(
            `/api/v1/platforms/${param.id}/`,
            PlatformSchema.validateSync(param)
        );
        console.log("I AM UPDATED")
        return PlatformSchema.validateSync(data);
    });
}

export function usePlatform(): { subject: PlatformSubject } {
    const ref = React.useRef<PlatformSubject>();

    if (!ref.current) {
        ref.current = new PlatformSubject(null);
    }

    return { subject: ref.current };
}

const PlatformContext = React.createContext<PlatformSubject>(null as any);

export function usePlatformContext(): PlatformSubject {
    return React.useContext(PlatformContext);
}

export default function PlatformProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformSubject }>) {
    return (
        <PlatformContext.Provider value={subject}>
            {children}
        </PlatformContext.Provider>
    );
}
