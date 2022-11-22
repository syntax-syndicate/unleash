import { Add, CloudCircle } from '@mui/icons-material';
import { Divider, styled } from '@mui/material';
import { IFeatureEnvironment, IFeatureVariant } from 'interfaces/featureToggle';
import { EnvironmentVariantsTable } from './EnvironmentVariantsTable/EnvironmentVariantsTable';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import GeneralSelect from 'component/common/GeneralSelect/GeneralSelect';
import { useMemo } from 'react';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { UPDATE_FEATURE_ENVIRONMENT_VARIANTS } from 'component/providers/AccessProvider/permissions';

const StyledCard = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadiusLarge,
    border: `1px solid ${theme.palette.dividerAlternative}`,
    '&:not(:last-child)': {
        marginBottom: theme.spacing(3),
    },
}));

const StyledHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div': {
        display: 'flex',
        alignItems: 'center',
    },
}));

const StyledCloudCircle = styled(CloudCircle, {
    shouldForwardProp: prop => prop !== 'deprecated',
})<{ deprecated?: boolean }>(({ theme, deprecated }) => ({
    color: deprecated
        ? theme.palette.neutral.border
        : theme.palette.primary.main,
}));

const StyledName = styled('span', {
    shouldForwardProp: prop => prop !== 'deprecated',
})<{ deprecated?: boolean }>(({ theme, deprecated }) => ({
    color: deprecated
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
    marginLeft: theme.spacing(1.25),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(3, 0),
}));

const StyledDescription = styled('p')(({ theme }) => ({
    fontSize: theme.fontSizes.smallBody,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
}));

const StyledGeneralSelect = styled(GeneralSelect)(({ theme }) => ({
    minWidth: theme.spacing(20),
}));

interface IEnvironmentVariantsCardProps {
    projectId: string;
    environment: IFeatureEnvironment;
    searchValue: string;
    onAddVariant: () => void;
    onEditVariant: (variant: IFeatureVariant) => void;
    onDeleteVariant: (variant: IFeatureVariant) => void;
    onUpdateStickiness: (variant: IFeatureVariant[]) => void;
    children?: React.ReactNode;
}

export const EnvironmentVariantsCard = ({
    projectId,
    environment,
    searchValue,
    onAddVariant,
    onEditVariant,
    onDeleteVariant,
    onUpdateStickiness,
    children,
}: IEnvironmentVariantsCardProps) => {
    const { context } = useUnleashContext();

    const variants = environment.variants ?? [];
    const stickiness = variants[0]?.stickiness || 'default';

    const stickinessOptions = useMemo(
        () => [
            'default',
            ...context.filter(c => c.stickiness).map(c => c.name),
        ],
        [context]
    );

    const options = stickinessOptions.map(c => ({ key: c, label: c }));
    if (!stickinessOptions.includes(stickiness)) {
        options.push({ key: stickiness, label: stickiness });
    }

    const updateStickiness = async (stickiness: string) => {
        const newVariants = [...variants].map(variant => ({
            ...variant,
            stickiness,
        }));
        onUpdateStickiness(newVariants);
    };

    const onStickinessChange = (value: string) => {
        updateStickiness(value).catch(console.warn);
    };

    return (
        <StyledCard>
            <StyledHeader>
                <div>
                    <StyledCloudCircle deprecated={!environment.enabled} />
                    <StyledName deprecated={!environment.enabled}>
                        {environment.name}
                    </StyledName>
                </div>
                {children}
            </StyledHeader>
            <ConditionallyRender
                condition={variants.length > 0}
                show={
                    <>
                        <EnvironmentVariantsTable
                            environment={environment}
                            searchValue={searchValue}
                            onEditVariant={onEditVariant}
                            onDeleteVariant={onDeleteVariant}
                        />
                        <PermissionButton
                            permission={UPDATE_FEATURE_ENVIRONMENT_VARIANTS}
                            projectId={projectId}
                            environmentId={environment.name}
                            onClick={onAddVariant}
                            variant="text"
                            startIcon={<Add />}
                        >
                            add variant
                        </PermissionButton>
                        <ConditionallyRender
                            condition={variants.length > 1}
                            show={
                                <>
                                    <StyledDivider />
                                    <p>Stickiness</p>
                                    <StyledDescription>
                                        By overriding the stickiness you can
                                        control which parameter is used to
                                        ensure consistent traffic allocation
                                        across variants.{' '}
                                        <a
                                            href="https://docs.getunleash.io/advanced/toggle_variants"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Read more
                                        </a>
                                    </StyledDescription>
                                    <StyledGeneralSelect
                                        options={options}
                                        value={stickiness}
                                        onChange={onStickinessChange}
                                    />
                                </>
                            }
                        />
                    </>
                }
            />
        </StyledCard>
    );
};
