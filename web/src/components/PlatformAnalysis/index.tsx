import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import { RouteComponentProps } from '@reach/router';
import * as querystring from 'query-string';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import '../../modules/Subject';
import { PlatformSchema } from '../PlatformListProvider';
import PlatformProvider, { usePlatform } from '../PlatformProvider';
import DataTab from './DataTab';
import EvaluationTab from './EvaluationTab';
import StrategyTab from './StrategyTab';
import ProgramTab from './ProgramTab';

const SyledAppBar = styled(AppBar)(({ theme }) => ({
    bottom: 0,
    top: 'auto',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.grey['50'],
}));

export default function PlatformAnalysis(this: any, {platformId,location,navigate,uri,}: RouteComponentProps<{platformId: number;}>) {
    const { type = 'data' } = querystring.parse(location?.search ?? '');

    const platform = usePlatform();

    const methods = useForm<Platform>({
        validationSchema: PlatformSchema,
    });

    const { reset, handleSubmit } = methods;

    const handlePlatform = React.useCallback(
        (state: State<Platform | null>) => {
            if (!state.value) {
                return;
            }
            reset(state.value);
        },
        [reset]
    );

    React.useEffect(() => {
        platform.subject.attach(handlePlatform);
        platform.subject.get({ id: platformId! });
        return () => platform.subject.detach(handlePlatform);
    }, [platform.subject, platformId, handlePlatform]);

    return (
        <>
            <Toolbar>
                <Tabs
                    indicatorColor="secondary"
                    textColor="secondary"
                    value={type}
                    onChange={(_event, type) => {
                        navigate?.(`${uri}?type=${type}`);
                    }}
                >
                    <Tab style={{color: "Black", fontWeight: "bold", fontSize: "14px"}}  label="Data" value="data" />
                    <Tab style={{color: "Black", fontWeight: "bold", fontSize: "14px"}}  label="Evaluation" value="evaluation" />
                    <Tab style={{color: "Black", fontWeight: "bold", fontSize: "14px"}}  label="Strategy" value="strategy" />
                    <Tab style={{color: "Black", fontWeight: "bold", fontSize: "14px"}}  label="Program" value="program" />
                </Tabs>
            </Toolbar>
            <form
                onSubmit={handleSubmit((value) => {
                    platform.subject.update({
                        ...value,
                        id: platformId!,
                    });
                })}
                noValidate
            >
                <FormContext {...methods}>
                    <PlatformProvider {...platform}>
                        <DataTab hidden={type !== 'data'} />
                        <EvaluationTab hidden={type !== 'evaluation'} />
                        <StrategyTab hidden={type !== 'strategy'} />
                        <ProgramTab hidden={type !== 'program'} />
                    </PlatformProvider>
                </FormContext>

                <Slide in={methods.formState.dirty} direction="up">
                    <SyledAppBar position="fixed">
                        <Box clone justifyContent="center">
                            <Toolbar>
                                <Box fontWeight={800} clone>
                                    <Button type="submit" size="large">
                                        Submit
                                    </Button>
                                </Box>
                                <Box fontWeight={800} clone>
                                    <Button
                                        type="reset"
                                        size="large"
                                        onClick={() => reset()}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            </Toolbar>
                        </Box>
                    </SyledAppBar>
                </Slide>
            </form>
            <Toolbar />
        </>
    );
}
