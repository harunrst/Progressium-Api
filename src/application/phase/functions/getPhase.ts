import { Phase } from "../../../domain/phase/phase";
import * as PhaseConstants from "../../../domain/phase/constants";
import { DbContext } from "../../../persistence/dbContext";
import { isValidPhase } from "../../utils";

/**
 * Get phase by id
 * @params {string} phaseId: Related phase id/name
 * @returns {Phase} The phase
 */
const getPhase = (phaseId: string): Phase => {
  if (!isValidPhase(phaseId)) {
    throw new Error(PhaseConstants.Validations.InvalidPhaseName);
  }

  const phase = DbContext.find<Phase>(phaseId);

  if (!phase) {
    throw new Error(PhaseConstants.Validations.PhaseNotFound);
  }

  return phase.getInstance();
};
export default getPhase;
