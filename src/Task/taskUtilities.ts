import { ERROR, SUCCESS } from "constant";
import { always, cond, equals, sort, sortWith,ascend,prop,pathOr,descend, map, keys, values, join, includes } from "ramda"
import { SORT_BY_NEWEST, SORT_BY_OLDEST, TAKS_PIRORITY_MAPPER } from "./constant"

/**
 * getIconNameBySort - will returns the icons for the sort type
 * @param sortOption sort type value
 */
export const getIconNameBySort = (sortOption: string) => {
    return cond<any,any>([
        [equals(SORT_BY_NEWEST),always('sort-alpha-asc')],
        [equals(SORT_BY_OLDEST),always('sort-alpha-desc')],
    ])(sortOption)
}

/**
 * handleSortSelection - will handle the sorting of the task based on priority that has been seggreagted
 * @param sortValue sorting type
 * @param priority priority of the task,to recognizes which asks for sorting
 * @param taskData full json of task data
 */
export const handleSortSelection = (sortValue: any, priority: string,taskData:any) => {
    return cond<any, any>([
      [
        equals(SORT_BY_NEWEST),
        () => sortWith([descend(prop('created_on'))], pathOr([], [TAKS_PIRORITY_MAPPER[priority]], taskData))
      ],
      [
        equals(SORT_BY_OLDEST),
        () => sortWith([ascend(prop('created_on'))], pathOr([], [TAKS_PIRORITY_MAPPER[priority]], taskData))
      ]
    ])(sortValue);
};
/**
 * mappedUserData - maps the users to the specific format that can be shown as Selection component
 * @param users list of users
 */
export const mappedUserData = (users: any) => {
    const userMapForSelctionFn = (user: any) => {
        return {label:pathOr('',['name'],user),value:pathOr('',['id'],user),role:'Users',...user}
    }
    return map(userMapForSelctionFn,users)
}
/**
 * convJsonToBodyData - converts json to form data to send it to axiosrequest
 * @param json json object {}
 */
export const convJsonToBodyData = (json: any) => {
    const keysOfTasks = keys(json);
    const valuesOfTasks = values(json);
    const listOfTasksData: string[] = [];
    keysOfTasks &&
      keysOfTasks.map((key: any, index: number) => {
        return listOfTasksData.push(`${key}=${valuesOfTasks[index]}`);
      });
    return join('&', listOfTasksData)
}
/**
 * chkSuccesResponse - will check the whether the response gets success
 * @param response response of the request
 */
export const chkSuccesResponse = (response: any) => includes(SUCCESS, values(response))

/**
 * chkSuccesResponse - will check the whether the response gets errors
 * @param response response of the request
 */
export const chkErrorResponse = (response: any) => includes(ERROR, values(response))

