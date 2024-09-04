import {
    Box,
    Button,
    Dialog,
    styled,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { GenerateApiKey } from './GenerateApiKey';
import { useEffect, useState } from 'react';
import { type Sdk, SelectSdk } from './SelectSdk';
import { GenrateApiKeyConcepts, SelectSdkConcepts } from './UnleashConcepts';

interface IConnectSDKDialogProps {
    open: boolean;
    onClose: () => void;
    project: string;
    environments: string[];
}

const ConnectSdk = styled('main')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.shape.borderRadiusLarge,
        maxWidth: theme.spacing(170),
        width: '100%',
        backgroundColor: 'transparent',
    },
    padding: 0,
    '& .MuiPaper-root > section': {
        overflowX: 'hidden',
    },
}));

const Navigation = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(16),
    borderTop: `1px solid ${theme.palette.divider}}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(4),
    alignItems: 'center',
    padding: theme.spacing(3, 8, 3, 8),
}));

const NextStepSectionSpacedContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(4),
    alignItems: 'center',
    padding: theme.spacing(3, 8, 3, 8),
}));

type OnboardingStage = 'select-sdk' | 'generate-api-key' | 'test-connection';

export const ConnectSdkDialog = ({
    open,
    onClose,
    environments,
    project,
}: IConnectSDKDialogProps) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [sdk, setSdk] = useState<Sdk | null>(null);
    const [environment, setEnvironment] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [stage, setStage] = useState<OnboardingStage>('select-sdk');

    const isSelectSdkStage = stage === 'select-sdk';
    const isGenerateApiKeyStage =
        stage === 'generate-api-key' && sdk && environment;
    const isTestConnectionStage =
        stage === 'test-connection' && sdk && environment && apiKey;

    useEffect(() => {
        if (environments.length > 0) {
            setEnvironment(environments[0]);
        }
    }, [JSON.stringify(environments)]);

    return (
        <StyledDialog open={open} onClose={onClose}>
            <Box sx={{ display: 'flex' }}>
                <ConnectSdk>
                    {isSelectSdkStage ? (
                        <SelectSdk
                            onSelect={(sdk) => {
                                setSdk(sdk);
                                setStage('generate-api-key');
                            }}
                        />
                    ) : null}
                    {isGenerateApiKeyStage ? (
                        <GenerateApiKey
                            environments={environments}
                            environment={environment}
                            project={project}
                            sdkType={sdk.type}
                            onEnvSelect={setEnvironment}
                            onApiKey={(apiKey) => {
                                setApiKey(apiKey);
                            }}
                        />
                    ) : null}
                    {isTestConnectionStage ? <div>Last stage</div> : null}

                    {stage === 'generate-api-key' ? (
                        <Navigation>
                            <NextStepSectionSpacedContainer>
                                <Button
                                    variant='text'
                                    color='inherit'
                                    onClick={() => {
                                        setStage('select-sdk');
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        setStage('test-connection');
                                    }}
                                >
                                    Next
                                </Button>
                            </NextStepSectionSpacedContainer>
                        </Navigation>
                    ) : null}
                    {isTestConnectionStage ? (
                        <Navigation>
                            <NextStepSectionSpacedContainer>
                                <Button
                                    variant='text'
                                    color='inherit'
                                    onClick={() => {
                                        setStage('generate-api-key');
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    Finish
                                </Button>
                            </NextStepSectionSpacedContainer>
                        </Navigation>
                    ) : null}
                </ConnectSdk>

                {isLargeScreen && isSelectSdkStage ? (
                    <SelectSdkConcepts />
                ) : null}
                {isLargeScreen && isGenerateApiKeyStage ? (
                    <GenrateApiKeyConcepts />
                ) : null}
            </Box>
        </StyledDialog>
    );
};
