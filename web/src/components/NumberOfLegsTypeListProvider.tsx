import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const NumberOfLegsTypeSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
    })
    .noUnknown();

export const NumberOfLegsTypeSchemaList = yup.array(NumberOfLegsTypeSchema);

declare global {
    export type NumberOfLegsType = yup.InferType<typeof NumberOfLegsTypeSchema>;
}

class NumberOfLegsTypeListSubject extends Subject<NumberOfLegsType[] | null> {
    cached: null | NumberOfLegsType[] = null;

    list = this.createAsync(async ({ cached }: { cached: boolean }) => {
        if (cached) {
            if (!this.cached) {
                const { data } = await axios.get<NumberOfLegsType[]>(
                    '/api/v1/number-of-legs-types/',
                    {
                        transformResponse(data) {
                            return NumberOfLegsTypeSchemaList.validateSync(
                                data
                            );
                        },
                    }
                );
                this.cached = data;
            }
        } else {
            const { data } = await axios.get<NumberOfLegsType[]>(
                '/api/v1/number-of-legs-types',
                {
                    transformResponse(data) {
                        return NumberOfLegsTypeSchemaList.validateSync(data);
                    },
                }
            );
            this.cached = data;
        }

        return this.cached;
    });
}

export function useNumberOfLegsTypeList(): {
    subject: NumberOfLegsTypeListSubject;
} {
    const ref = React.useRef<NumberOfLegsTypeListSubject>();

    if (!ref.current) {
        ref.current = new NumberOfLegsTypeListSubject(null);
    }

    return { subject: ref.current };
}

const NumberOfLegsTypeListContext = React.createContext<
    NumberOfLegsTypeListSubject
>(null as any);

export function useNumberOfLegsTypeListContext(): NumberOfLegsTypeListSubject {
    return React.useContext(NumberOfLegsTypeListContext);
}

export default function NumberOfLegsTypeListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: NumberOfLegsTypeListSubject }>) {
    return (
        <NumberOfLegsTypeListContext.Provider value={subject}>
            {children}
        </NumberOfLegsTypeListContext.Provider>
    );
}
