// Action types
import {
  RATE_STREET,
  UNDO_RATE_STREET,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleLog = (state = defaults, action) => {
  const log = state.slice();
  switch (action.type) {
    case RATE_STREET:
      log.push(action);
      return log;
    case UNDO_RATE_STREET:
      log.pop();
      return log;
    default:
      return state;
  }
};


export default handleLog;
