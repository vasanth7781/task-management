import { equals, filter, findIndex, groupBy, head, lensPath, map, omit, pathOr, propEq, set, toLower } from 'ramda';
import React, { useEffect, useState } from 'react';
import { Button, Icon, Notification, Panel } from 'rsuite';
import styled from 'styled-components';
import { TAKS_PIRORITY_MAPPER, TASK_PRIORITYS, TASK_STATE_PATH, USERS_STATE_PATH } from 'Task/constant';
import { chkErrorResponse, chkSuccesResponse, convJsonToBodyData, handleSortSelection } from 'Task/taskUtilities';
import SortTaskLanding from './SortTasks';
import TaskPanelWrapper from './TaskPanelWrapper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import withTaskHooks from 'hooks/withTaskHooks';
import { DELETE_TASK, LIST_TASKS, UPDATE_TASK } from 'hooks/constant';
import { ERROR, SUCCESS } from 'constant';

interface Props {
  taskState: any;
  handleTaskState: any;
}

const TASK_NOT_DELETED = 'Task not deleted'
const TASK_NOT_UPDATED = 'Task not updated'

const ViewTasksLanding: React.FC<Props> = (props: Props) => {
  const { taskState } = props;
  const groupByData = groupBy((x: any) => pathOr('', ['priority'], x));
  const { taskCall } = withTaskHooks();

  const [tasks, setTasks] = useState(groupByData(pathOr([], TASK_STATE_PATH, taskState)));

  useEffect(() => {
      setTasks(groupByData(pathOr([], TASK_STATE_PATH, taskState)));
      // eslint-disable-next-line
  }, [pathOr([], TASK_STATE_PATH, taskState)]);

  const [deleteLoading, setDeleteLoading] = useState({});

  const handleSortChanges = (value: any, priority: any) => {
    return setTasks(
      set(lensPath([TAKS_PIRORITY_MAPPER[priority]]), handleSortSelection(value, priority, tasks), tasks)
    );
  };
  const handleTaskUpdate = (updatedTask: any) => {
    taskCall(UPDATE_TASK)(
      convJsonToBodyData({ taskid: Number(pathOr('', ['id'], updatedTask)), ...omit(['id'], updatedTask) })
    )
      .then((res: any) => {
        if (chkErrorResponse(res)) {
          Notification[SUCCESS]({
            title: TASK_NOT_UPDATED,
            description: <span>{pathOr('', ['error'], res)}</span>
          });
        }
      })
      .catch((err: any) => {
        Notification[ERROR]({
          title: TASK_NOT_UPDATED,
          description: <span>Somthing went wrong</span>
        });
      });
  };
  const handleDrag = (value: any) => {
    if (pathOr('', ['destination', 'droppableId'], value)) {
      const getFilteredData = filter(
        (task: any) => equals(pathOr('', ['id'], task), String(pathOr('', ['source', 'index'], value))),
        pathOr([], TASK_STATE_PATH, taskState)
      );
      const indexOfPushedTask = findIndex(propEq('id', String(pathOr('', ['source', 'index'], value))))(
        pathOr([], TASK_STATE_PATH, taskState)
      );

      const updateTask = set(
        lensPath(['priority']),
        TAKS_PIRORITY_MAPPER[pathOr('', ['destination', 'droppableId'], value)],
        head(getFilteredData)
      );
      const updateValue = set(lensPath([indexOfPushedTask]), updateTask, pathOr([], TASK_STATE_PATH, taskState));
      handleTaskUpdate(updateTask);
      props.handleTaskState(TASK_STATE_PATH, updateValue);
      return setTasks(groupByData(updateValue));
    }
    return;
  };

  const handleDelete = (taskId: any) => {
    setDeleteLoading({ [taskId]: true });
    taskCall(DELETE_TASK)(convJsonToBodyData({ taskid: Number(taskId) }))
      .then((res: any) => {
        if (chkSuccesResponse(res)) {
          taskCall(LIST_TASKS)({}).then((res: any) => {
            props.handleTaskState(TASK_STATE_PATH, pathOr([], ['tasks'], res));
            setTasks(groupByData(pathOr([], ['tasks'], res)));
            Notification[SUCCESS]({
              title: 'Task deleted',
              description: <span>Task deleted successfully</span>
            });
            setDeleteLoading({ [taskId]: false });
          });
        }
        if (chkErrorResponse(res)) {
          Notification[ERROR]({
            title: TASK_NOT_DELETED,
            description: <span>{pathOr('', ['error'], res)}</span>
          });
          setDeleteLoading({ [taskId]: false });
        }
      })
      .catch((err: any) => {
        Notification[ERROR]({
          title: TASK_NOT_DELETED,
          description: <span>Somthing went wrong</span>
        });
        setDeleteLoading({ [taskId]: false });
      });
  };
  const mappedTaskPriorits = map((priority: string) => {
    const data = pathOr([], [TAKS_PIRORITY_MAPPER[priority]], tasks);
    return (
      <Droppable droppableId={priority} key={priority}>
        {(provided: any) => {
          return (
            <div className={`col p-3 tasks-borders`} ref={provided.innerRef} {...provided.droppableProps}>
              <div className={'row'}>
                <div className={'col pirority-header'}>
                  <h4>{priority} pirority</h4>
                </div>
                <div className={'col'}>
                  <SortTaskLanding handleSortSelection={handleSortChanges} priority={priority} />
                </div>
              </div>
              {data && (
                <div>
                  {data &&
                    data.map((singleTask: any, index: number) => {
                      return (
                        <Panel
                          shaded
                          key={Number(pathOr(index, ['id'], singleTask))}
                          className={`task-panel ${toLower(priority)}__task mt-4`}
                        >
                          <TaskPanelWrapper
                            key={Number(pathOr(index, ['id'], singleTask))}
                            index={Number(pathOr(index, ['id'], singleTask))}
                            data={singleTask}
                            users={pathOr([], USERS_STATE_PATH, taskState)}
                          />

                          <div className={'mt-1'} style={{ textAlign: 'right' }}>
                            <Button
                              appearance={'subtle'}
                              loading={pathOr(false, [pathOr(index, ['id'], singleTask)], deleteLoading)}
                            >
                              <Icon
                                onClick={() => handleDelete(pathOr(index, ['id'], singleTask))}
                                icon={'trash'}
                                style={{ fontSize: '24px', cursor: 'pointer' }}
                              />
                            </Button>
                          </div>
                        </Panel>
                      );
                    })}
                  {provided.placeHolder}
                </div>
              )}
            </div>
          );
        }}
      </Droppable>
    );
  }, TASK_PRIORITYS);
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <TaskViewWrapper className={'row view__tasks mt-5'}>{mappedTaskPriorits}</TaskViewWrapper>;
    </DragDropContext>
  );
};

const TaskViewWrapper = styled.div`
  &.view__tasks .high__task {
    border: solid red;
    border-width: 0px;
    border-left-width: 4px;
  }
  &.view__tasks .task__pheader {
    height: 50px;
  }
  &.view__tasks .pirority-header {
    text-align: left;
  }
  &.view__tasks .task__pbody {
    height: 100px;
  }
  &.view__tasks .task-panel {
    height: 175;
  }
  &.view__tasks .medium__task {
    border: solid orange;
    border-width: 0px;
    border-left-width: 4px;
  }
  &.view__tasks .low__task {
    border: solid green;
    border-width: 0px;
    border-left-width: 4px;
  }
`;

export default ViewTasksLanding;
