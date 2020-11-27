import { Redirect, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import BracingTypeListProvider, { useBracingTypeList } from './BracingTypeListProvider';
import Layout from './Layout';
import NumberOfLegsTypeListProvider, { useNumberOfLegsTypeList } from './NumberOfLegsTypeListProvider';
import PlatformMannedStatusListProvider, { usePlatformMannedStatusList } from './PlatformMannedStatusListProvider';
import PlatformTypeListProvider, { usePlatformTypeList } from './PlatformTypeListProvider';
import UpdatePlatform from './UpdatePlatform';

const NewUser = React.lazy(() => import('./Newuser'));

const NewProject = React.lazy(() => import('./NewProject'));

const UpdateProject = React.lazy(() => import('./UpdateProject'));

const NewPlatform = React.lazy(() => import('./NewPlatform'));
const Platform = React.lazy(() => import('./NewPlatform'));
const Existinguser = React.lazy(() => import('./Existinguser'));

const CreatePlatform = React.lazy(() => import('./CreatePlatform'));

const PlatformAnalysis = React.lazy(() => import('./PlatformAnalysis'));

const PlatformList = React.lazy(() => import('./PlatformList'));

const ProjectList = React.lazy(() => import('./ProjectList'));

export default function Dashboard(_: RouteComponentProps) {
    const platformTypeListMethods = usePlatformTypeList();
    const numberOfLegsTypeListMethods = useNumberOfLegsTypeList();
    const bracingTypeListMethods = useBracingTypeList();
    const platformMannedStatusListMethods = usePlatformMannedStatusList();

    React.useEffect(() => {
        platformTypeListMethods.subject.list({ cached: true });
    }, [platformTypeListMethods]);

    React.useEffect(() => {
        numberOfLegsTypeListMethods.subject.list({ cached: true });
    }, [numberOfLegsTypeListMethods]);

    React.useEffect(() => {
        bracingTypeListMethods.subject.list({ cached: true });
    }, [bracingTypeListMethods]);

    React.useEffect(() => {
        platformMannedStatusListMethods.subject.list({ cached: true });
    }, [platformMannedStatusListMethods]);

    return (
        <PlatformTypeListProvider {...platformTypeListMethods}>
            <NumberOfLegsTypeListProvider {...numberOfLegsTypeListMethods}>
                <BracingTypeListProvider {...bracingTypeListMethods}>
                    <PlatformMannedStatusListProvider
                        {...platformMannedStatusListMethods}
                    >
                        <Layout>
                            <Router>
                                <Redirect from="/" to="rbui" noThrow />
                                <ProjectList path="projects" default />
                                <NewUser path="newuser" />
                                <NewProject path="newProject" />
                                <UpdateProject path="UpdateProject/:projectId" />
                                <NewPlatform path="NewPlatform/:projectId" />
                                <UpdatePlatform path="UpdatePlatform/:platformId/"/>
                                <Platform path="Platform" />
                                <Existinguser path = "existinguser" />
                                <CreatePlatform path = "CreatePlatform" />
                                <PlatformList path="project/:projectId/platforms" />
                                {/* <PlatformList path="platforms" /> */}
                                <PlatformAnalysis path="platforms/:platformId/analysis" />
                            </Router>
                        </Layout>
                    </PlatformMannedStatusListProvider>
                </BracingTypeListProvider>
            </NumberOfLegsTypeListProvider>
        </PlatformTypeListProvider>
    );
}
