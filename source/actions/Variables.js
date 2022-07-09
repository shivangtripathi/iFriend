import { CHANGE_VARIABLE } from './Type';
export const change_variable = (key, value) => {
  	return ({
    	type:CHANGE_VARIABLE,
    	payload:{ key, value }
  	});
}

export const production_flag = false;
export const base_url = "http://www.boredapi.com/api/activity";
