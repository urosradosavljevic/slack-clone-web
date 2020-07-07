import gql from "graphql-tag";

export const teamMembersQuery = gql`
  query TeamMembersQuery($teamId: Int!) {
    teamMembers(teamId: $teamId) {
      id
      email
      username
    }
  }
`;
