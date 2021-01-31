import { always, cond, equals, sort, sortWith,ascend,prop,pathOr,descend, map, keys, values, join, includes } from "ramda"
import { SORT_BY_NEWEST, SORT_BY_OLDEST, TAKS_PIRORITY_MAPPER } from "./constant"

export const getIconNameBySort = (sortOption: string) => {
    return cond<any,any>([
        [equals(SORT_BY_NEWEST),always('sort-alpha-asc')],
        [equals(SORT_BY_OLDEST),always('sort-alpha-desc')],
    ])(sortOption)
}

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
export const mappedUserData = (users: any) => {
    const userMapForSelctionFn = (user: any) => {
        return {label:pathOr('',['name'],user),value:pathOr('',['id'],user),role:'Users',...user}
    }
    return map(userMapForSelctionFn,users)
}

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

export const chkSuccesResponse = (response: any) => includes('success', values(response))
export const chkErrorResponse = (response: any) => includes('error', values(response))

