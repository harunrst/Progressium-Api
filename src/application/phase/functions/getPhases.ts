import { Phase } from "../../../domain/phase/phase";
import * as PhaseConstants from "../../../domain/phase/constants";
import { DbContext } from "../../../persistence/dbContext";

/**
 * Get phases with specified fields
 * @returns {Phase[]} A phase list
 */
const getPhases = (): Phase[] => {
  const phases = [
    DbContext.find<Phase>(PhaseConstants.DefaultPhases.Foundation),
    DbContext.find<Phase>(PhaseConstants.DefaultPhases.Discovery),
    DbContext.find<Phase>(PhaseConstants.DefaultPhases.Delivery),
  ];
  return phases;
};
export default getPhases;
