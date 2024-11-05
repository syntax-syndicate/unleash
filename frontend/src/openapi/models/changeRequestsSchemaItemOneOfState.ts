/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The current state of the change request.
 */
export type ChangeRequestsSchemaItemOneOfState =
    (typeof ChangeRequestsSchemaItemOneOfState)[keyof typeof ChangeRequestsSchemaItemOneOfState];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ChangeRequestsSchemaItemOneOfState = {
    Draft: 'Draft',
    In_review: 'In review',
    Approved: 'Approved',
    Applied: 'Applied',
    Cancelled: 'Cancelled',
    Rejected: 'Rejected',
} as const;
