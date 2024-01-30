/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type ExecutiveSummarySchemaFlagTrendsItem = {
    /** The number of active flags on a particular day */
    active: number;
    /** A UTC date when the stats were captured. Time is the very end of a given day. */
    date: string;
    /** The number of time calculated potentially stale flags on a particular day */
    potentiallyStale?: number;
    /** The number of user marked stale flags on a particular day */
    stale: number;
    /** The number of all flags on a particular day */
    total: number;
};
