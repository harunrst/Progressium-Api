import * as Constants from "../../common/constants";

export const phaseDef = `#graphql
  extend type Query {
    phases: [String]
  }
`;

export const phaseRes = {
  Query: {
    phases: () => Object.values(Constants.DefaultPhases),
  },
};
