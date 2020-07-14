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

export const createTeamQuery = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;