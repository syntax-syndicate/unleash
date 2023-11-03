/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { FeatureStrategySchema } from './featureStrategySchema';
import type { VariantSchema } from './variantSchema';

/**
 * A detailed description of the feature environment
 */
export interface FeatureEnvironmentSchema {
    /** The name of the environment */
    name: string;
    /** The name of the feature */
    featureName?: string;
    /** The name of the environment */
    environment?: string;
    /** The type of the environment */
    type?: string;
    /** `true` if the feature is enabled for the environment, otherwise `false`. */
    enabled: boolean;
    /** The sort order of the feature environment in the feature environments list */
    sortOrder?: number;
    /** The number of defined variants */
    variantCount?: number;
    /** A list of activation strategies for the feature environment */
    strategies?: FeatureStrategySchema[];
    /** A list of variants for the feature environment */
    variants?: VariantSchema[];
    /** The date when metrics where last collected for the feature environment */
    lastSeenAt?: string | null;
    /** Whether the feature has any strategies defined. */
    hasStrategies?: boolean;
    /** Whether the feature has any enabled strategies defined. */
    hasEnabledStrategies?: boolean;
}
