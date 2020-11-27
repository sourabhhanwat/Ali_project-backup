import formatRFC7231 from 'date-fns/formatRFC7231';
import React from 'react';
import '../modules/Subject';
import { SkeletonResourceCard } from './ResourceCard';

const HEADERS = [
    { key: 'name' as const, label: 'Name' },
    { key: 'description' as const, label: 'Description' },
    {
        key: 'updated_at' as const,
        label: 'Last Updated',
        transform: (value: Date) => {
            return formatRFC7231(value);
        },
    },
];

const HEADER_LABELS = HEADERS.map((header) => header.label);

export const SkeletonProjectCard = React.memo(() => (
    <SkeletonResourceCard headers={HEADER_LABELS} />
));

export default function ProjectCard({ project }: { project: Project }) {
    // const { subject } = useSiteList();

    // const [sites, setSites] = React.useState<Site[] | null>();
    // const [isPending, setIsPending] = React.useState<boolean>();

    // const handleSiteList = (state: State<Site[] | null>) => {
    //     setIsPending(state.isPending);
    //     setSites(state.value);
    // };

    // React.useEffect(() => {
    //     subject.attach(handleSiteList);
    //     subject.list({
    //         filter: {
    //             project: project.id,
    //         },
    //     });
    //     return () => subject.detach(handleSiteList);
    // }, [project.id, subject]);

    return (
        <p>hello</p>
        // <ResourceCard 
        // // <Site>
        //     updatedAt={project.updated_at}
        //     // isPending={isPending}
        //     title={`Project ${project.name}`}
        //     caption={project.description}
        //     headers={HEADERS}
        //     // getKey={(resource) => `${resource.id}`}
        //     // resources={sites}
        //     link={`/dashboard/projects/${project.id}/sites`}
        // />
    );
}
