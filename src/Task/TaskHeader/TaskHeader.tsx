import React from 'react';
import { Button } from 'rsuite';
import styled from 'styled-components';
import { NEW_TASK_MODAL_PATH } from 'Task/constant';

interface Props {
  taskState: any;
  handleTaskState: any;
}
const TaskHeader: React.FC<Props> = (props: Props) => {
  const { taskState, handleTaskState } = props;
  return (
    <TaskHeaderWrapper className={'task__wrapper row'}>
      <div className={'col align-self-center task-header-left'}>
        <h1>Task overview</h1>
      </div>
      <div className={'col align-self-center task-header-right'}>
        <Button appearance={'primary'} onClick={() => handleTaskState(NEW_TASK_MODAL_PATH, true)}>
          Add new task
        </Button>
      </div>
    </TaskHeaderWrapper>
  );
};

const TaskHeaderWrapper = styled.div`
  &.task__wrapper .task-header-left {
    text-align: left;
  }
  &.task__wrapper .task-header-right {
    text-align: right;
  }
`;

export default TaskHeader;
