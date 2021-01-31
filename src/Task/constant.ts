export const NEW_TASK_MODAL_PATH = ['isTaskModal']
export const NEW_TASK_NAME = 'newTask'
export const TAKS_FORM_STATE = [NEW_TASK_NAME]
export const TASK_LIST_NAME = 'taskList'
export const USERS_LIST_NAME ='usersLists'
export const TASK_STATE_PATH = [TASK_LIST_NAME]
export const USERS_STATE_PATH = [USERS_LIST_NAME]
export const HIGH_PRIORITY_TASK_NAME = 'High'
export const LOW_PRIORITY_TASK_NAME = 'Low'
export const MEDIUM_PRIORITY_TASK_NAME = 'Medium'
export const TASK_PRIORITYS = [HIGH_PRIORITY_TASK_NAME,MEDIUM_PRIORITY_TASK_NAME,LOW_PRIORITY_TASK_NAME]
export const SORT_BY_OLDEST = 'Oldest'
export const SORT_BY_NEWEST = 'Latest'
export const TASK_SORT_SELECTOR = [
    { label: SORT_BY_NEWEST, value: SORT_BY_NEWEST, role: 'Date' },
    { label: SORT_BY_OLDEST, value: SORT_BY_OLDEST, role: 'Date' }
]

export const HIGH_PRIORITY_TASK_REPRESENTATION = '1'
export const MEDIUM_PRIORITY_TASK_REPRESENTATION = '2'
export const LOW_PRIORITY_TASK_REPRESENTATION = '3'
export const TAKS_PIRORITY_MAPPER:any = {
    [HIGH_PRIORITY_TASK_NAME]: HIGH_PRIORITY_TASK_REPRESENTATION,
    [MEDIUM_PRIORITY_TASK_NAME]: MEDIUM_PRIORITY_TASK_REPRESENTATION,
    [LOW_PRIORITY_TASK_NAME]:LOW_PRIORITY_TASK_REPRESENTATION
}
export const TASK_PRIORITY_SELECTOR = [
    {label:HIGH_PRIORITY_TASK_NAME,value:HIGH_PRIORITY_TASK_REPRESENTATION},
    {label:MEDIUM_PRIORITY_TASK_NAME,value:MEDIUM_PRIORITY_TASK_REPRESENTATION},
    {label:LOW_PRIORITY_TASK_NAME,value:LOW_PRIORITY_TASK_REPRESENTATION}
]