import React, { useEffect, useState } from 'react'
import TaskHeader from 'Task/TaskHeader'
import ViewTasksLanding from 'Task/ViewTasks'
import {withState,compose} from 'recompose'
import { lensPath, pathOr, set } from 'ramda'
import CreateTaskLanding from 'Task/CreateTask'
import withTaskHooks from 'hooks/withTaskHooks'
import withUserHooks from 'hooks/withUserHooks'
import { Loader } from 'rsuite'

interface Props{
    taskState: any
    handleTaskState:any
}
const TaskLanding: React.FC<Props> = (props: Props) => {
    const { taskState, handleTaskState } = props
    const [loading,setLoading] = useState(true)
    const { taskCall } = withTaskHooks()
    const {userCall} = withUserHooks()
    const handleTaskStateChange = (path:any,value:any) => {
        return handleTaskState(set(lensPath(path),value,taskState))
    }
    useEffect(() => {
        // @ts-ignore
        const tasks = taskCall('listTasks')()
        const users = userCall('listUsers')()
        Promise.all([tasks, users]).then((res: any) => {
            const [tasksResponse, usersResponse] = res
            handleTaskStateChange([],{taskLists:pathOr([],['tasks'],tasksResponse),usersLists:pathOr([],['users'],usersResponse)})
            setLoading(false)
        }).catch((err: any) => {
            setLoading(false)
            // TO-DO : add a sentry errorpor GA track
        })
    }, [])
    if (loading) {
        return <Loader center size="md"/>
    }
    return (
        <div>
            <TaskHeader taskState={taskState} handleTaskState={handleTaskStateChange} />
            <CreateTaskLanding  taskState={taskState} handleTaskState={handleTaskStateChange}/>
            <ViewTasksLanding taskState={taskState} handleTaskState={handleTaskStateChange}/>

        </div>
    )
}
export default compose<Props,any>(
        withState('taskState','handleTaskState',{})
    )(TaskLanding)