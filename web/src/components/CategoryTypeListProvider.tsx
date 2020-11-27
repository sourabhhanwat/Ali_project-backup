import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const PlatformMannedStatusSchema1 = yup
    .object({
        id: yup.number(),
        username: yup.string(),
        // name: yup.string(),
        // ranking: yup.string(),
        // description: yup.string(),
    })
    .noUnknown();

export const PlatformMannedStatusListSchema1 = yup.array(
    PlatformMannedStatusSchema1
);

declare global {
    export type platform_manned_status1 = yup.InferType<
        typeof PlatformMannedStatusSchema1
    >;
}

class PlatformMannedStatusListSubject1 extends Subject<
    platform_manned_status1[] | null
> {
    cached: null | platform_manned_status1[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<platform_manned_status1[]>(
                    '/api/v1/users/',
                    {
                        transformResponse(data) {
                            return PlatformMannedStatusListSchema1.validateSync(
                                data
                            );
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<platform_manned_status1[]>(
                '/api/v1/users/',
                {
                    transformResponse(data) {
                        return PlatformMannedStatusListSchema1.validateSync(
                            data
                        );
                    },
                }
            );
            this.cached = data;
        }

        return this.cached;
    });
}

export function usePlatformMannedStatusList1(): {
    subject: PlatformMannedStatusListSubject1;
} {
    const ref = React.useRef<PlatformMannedStatusListSubject1>();

    if (!ref.current) {
        ref.current = new PlatformMannedStatusListSubject1(null);
    }

    return { subject: ref.current };
}

const PlatformMannedStatusListContext1 = React.createContext<
    PlatformMannedStatusListSubject1
>(null as any);

export function usePlatformMannedStatusListContext1(): PlatformMannedStatusListSubject1 {
    return React.useContext(PlatformMannedStatusListContext1);
}

export default function PlatformMannedStatusListProvider1({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformMannedStatusListSubject1 }>) {
    return (
        <PlatformMannedStatusListContext1.Provider value={subject}>
            {children}
        </PlatformMannedStatusListContext1.Provider>
    );
}
