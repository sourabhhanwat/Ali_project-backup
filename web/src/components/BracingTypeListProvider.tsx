import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const BracingTypeSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
    })
    .noUnknown();

export const BracingTypeListSchema = yup.array(BracingTypeSchema);

declare global {
    export type BracingType = yup.InferType<typeof BracingTypeSchema>;
}

class BracingTypeListSubject extends Subject<BracingType[] | null> {
    cached: null | BracingType[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<BracingType[]>(
                    '/api/v1/bracing-types/',
                    {
                        transformResponse(data) {
                            return BracingTypeListSchema.validateSync(data);
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<BracingType[]>(
                '/api/v1/bracing-types/',
                {
                    transformResponse(data) {
                        return BracingTypeListSchema.validateSync(data);
                    },
                }
            );
            this.cached = data;
        }

        return this.cached;
    });
}

export function useBracingTypeList(): { subject: BracingTypeListSubject } {
    const ref = React.useRef<BracingTypeListSubject>();

    if (!ref.current) {
        ref.current = new BracingTypeListSubject(null);
    }

    return { subject: ref.current };
}

const BracingTypeListContext = React.createContext<BracingTypeListSubject>(
    null as any
);

export function useBracingTypeListContext(): BracingTypeListSubject {
    return React.useContext(BracingTypeListContext);
}

export default function BracingTypeListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: BracingTypeListSubject }>) {
    return (
        <BracingTypeListContext.Provider value={subject}>
            {children}
        </BracingTypeListContext.Provider>
    );
}
