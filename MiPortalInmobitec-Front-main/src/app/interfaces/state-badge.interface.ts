/**
 * @param type : type | outline-${type}
 * @param description string
 *
 * Types:
 *
 * primary
 * secondary
 * success
 * info
 * warning
 * danger
 * light
 * dark
 * white
 *
 */
export interface StateBadge {
  id: number;
  type: string;
  description: string;
}
