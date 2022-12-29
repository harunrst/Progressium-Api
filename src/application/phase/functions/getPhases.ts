import { Phase } from "../../../domain/phase/phase";
import * as PhaseConstants from "../../../domain/phase/constants";
import getPhase from "./getPhase";

/**
 * Get phases with specified fields
 * @returns {Phase[]} A phase list
 */
const getPhases = (): Phase[] => {
  //pretty weird get list call because of the database limitations at the moment
  //for the sake of demo :)
  const phases = [
    getPhase(PhaseConstants.DefaultPhases.Foundation),
    getPhase(PhaseConstants.DefaultPhases.Discovery),
    getPhase(PhaseConstants.DefaultPhases.Delivery),
  ];
  return phases;
};
export default getPhases;
