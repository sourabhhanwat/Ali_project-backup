import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const PlatformMannedStatusSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
        ranking: yup.string(),
        description: yup.string(),
    })
    .noUnknown();

export const PlatformMannedStatusListSchema = yup.array(
    PlatformMannedStatusSchema
);

declare global {
    export type platform_manned_status = yup.InferType<
        typeof PlatformMannedStatusSchema
    >;
}

class PlatformMannedStatusListSubject extends Subject<
    platform_manned_status[] | null
> {
    cached: null | platform_manned_status[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<platform_manned_status[]>(
                    '/api/v1/platform-manned-statuses/',
                    {
                        transformResponse(data) {
                            return PlatformMannedStatusListSchema.validateSync(
                                data
                            );
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<platform_manned_status[]>(
                '/api/v1/platform-manned-statuses/',
                {
                    transformResponse(data) {
                        return PlatformMannedStatusListSchema.validateSync(
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

export function usePlatformMannedStatusList(): {
    subject: PlatformMannedStatusListSubject;
} {
    const ref = React.useRef<PlatformMannedStatusListSubject>();

    if (!ref.current) {
        ref.current = new PlatformMannedStatusListSubject(null);
    }

    return { subject: ref.current };
}

const PlatformMannedStatusListContext = React.createContext<
    PlatformMannedStatusListSubject
>(null as any);

export function usePlatformMannedStatusListContext(): PlatformMannedStatusListSubject {
    return React.useContext(PlatformMannedStatusListContext);
}

export default function PlatformMannedStatusListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformMannedStatusListSubject }>) {
    return (
        <PlatformMannedStatusListContext.Provider value={subject}>
            {children}
        </PlatformMannedStatusListContext.Provider>
    );
}
