/**
 * Utility to check if a user is a CodePiper team member
 */
export function isContinueTeamMember(email?: string): boolean {
  if (!email) return false;
  return email.includes("@modelpiper.com");
}
