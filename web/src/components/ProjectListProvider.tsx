import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const ProjectSchema = yup
    .object({
        id: yup.number(),
        name: yup.string(),
        description: yup.string(),
        start_date: yup.string().typeError('Date should have pattern dd/MM/yyyy'),
        end_date: yup.string().typeError('Date should have pattern dd/MM/yyyy'),
        created_at: yup.date(),
        updated_at: yup.date(),
    })
    .noUnknown();

export const ProjectListSchema = yup.array(ProjectSchema);

declare global {
    type Project = yup.InferType<typeof ProjectSchema>;
}

class ProjectListSubject extends Subject<Project[] | null> {
    list = this.createAsync(async () => {
        const { data } = await axios.get<Project[]>('/api/v1/projects/', {
            transformResponse(data) {
                return ProjectListSchema.validateSync(data);
            },
        });
        return data;
    });
}

export function useProjectList(): { subject: ProjectListSubject } {
    const ref = React.useRef<ProjectListSubject>();

    if (!ref.current) {
        ref.current = new ProjectListSubject(null);
    }

    return { subject: ref.current };
}

const ProjectListContext = React.createContext<ProjectListSubject>(null as any);

export function useProjectListContext(): ProjectListSubject {
    return React.useContext(ProjectListContext);
}

export default function ProjectListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: ProjectListSubject }>) {
    return (
        <ProjectListContext.Provider value={subject}>
            {children}
        </ProjectListContext.Provider>
    );
}
