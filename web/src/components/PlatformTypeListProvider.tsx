import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const PlatformTypeSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
    })
    .noUnknown();

export const PlatformTypeListSchema = yup.array(PlatformTypeSchema);

declare global {
    export type PlatformType = yup.InferType<typeof PlatformTypeSchema>;
}

class PlatformTypeListSubject extends Subject<PlatformType[] | null> {
    cached: null | PlatformType[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<PlatformType[]>(
                    '/api/v1/platform-types/',
                    {
                        transformResponse(data) {
                            return PlatformTypeListSchema.validateSync(data);
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<PlatformType[]>(
                '/api/v1/platform-types/',
                {
                    transformResponse(data) {
                        return PlatformTypeListSchema.validateSync(data);
                    },
                }
            );
            this.cached = data;
        }

        return this.cached;
    });
}

export function usePlatformTypeList(): { subject: PlatformTypeListSubject } {
    const ref = React.useRef<PlatformTypeListSubject>();

    if (!ref.current) {
        ref.current = new PlatformTypeListSubject(null);
    }

    return { subject: ref.current };
}

const PlatformTypeListContext = React.createContext<PlatformTypeListSubject>(
    null as any
);

export function usePlatformTypeListContext(): PlatformTypeListSubject {
    return React.useContext(PlatformTypeListContext);
}

export default function PlatformTypeListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformTypeListSubject }>) {
    return (
        <PlatformTypeListContext.Provider value={subject}>
            {children}
        </PlatformTypeListContext.Provider>
    );
}
