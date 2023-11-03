/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * An object describing a banner to be displayed to all users.
 */
export interface BannerSchema {
    /** The banner's ID. Banner IDs are incrementing integers. In other words, a more recently created banner will always have a higher ID than an older one. */
    id: number;
    /** The message to display to all users. Supports markdown. */
    message: string;
    /** Whether the banner should be displayed currently. If not specified, defaults to true. */
    enabled?: boolean;
    /** The variant of the banner. One of "info", "warning", "error", or "success". If not specified, defaults to "info". */
    variant?: string;
    /** Whether the banner should be sticky on the screen. If not specified, defaults to `false`. */
    sticky?: boolean;
    /** The icon to display on the banner. Can be one of https://fonts.google.com/icons. If not specified, this will be the default icon for the variant. If "none", no icon will be displayed. */
    icon?: string | null;
    /** The link to display on the banner. Can either be an absolute or a relative link (e.g. absolute: "https://example.com" or relative: "/admin/service-accounts"). If "dialog", will display a dialog when clicked. If not specified, no link will be displayed. */
    link?: string | null;
    /** The text to display on the link. If not specified, will be displayed as "More info". */
    linkText?: string | null;
    /** The title to display on the dialog. If not specified, this will be the same as `linkText`. */
    dialogTitle?: string | null;
    /** The markdown to display on the dialog. If not specified, no dialog will be displayed. */
    dialog?: string | null;
    /** The date and time of when the banner was created. */
    createdAt: string;
}
